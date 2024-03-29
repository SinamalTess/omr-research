import * as tf from "@tensorflow/tfjs";
import { getPreparedData } from "../../adapters";
import { Tensor } from "@tensorflow/tfjs";
import { NormalizedCar } from "../../domain";
import { compileModel } from "./compile";
import { NormalizationData, getPredictions } from "./test";
import { AxesKeys } from "../../types";

interface TrainingConfig {
  onEpochEnd: Function;
  onTrainingEnd: Function;
  modelParams: ModelParams;
  axesKeys: AxesKeys;
}

export interface Tensors extends NormalizationData {
  normalizedInputs: tf.Tensor<tf.Rank>;
  normalizedLabels: tf.Tensor<tf.Rank>;
}

export interface ModelParams extends ModelConfig {
  tensors: Tensors;
}

export const startTraining = (
  model: tf.LayersModel,
  data: NormalizedCar[],
  config: TrainingConfig
) => {
  if (!data.length) return;
  const { onEpochEnd, onTrainingEnd, modelParams, axesKeys } = config;
  const { tensors } = modelParams;

  trainModel(model, modelParams, onEpochEnd).then((History) => {
    const losses = History.history.loss;
    const finalLoss = losses[Math.max(losses.length - 1, 0)];
    const predictedPoints = getPredictions(model, tensors, data, axesKeys);
    onTrainingEnd(predictedPoints, finalLoss);
  });
};

export const getModelParams = (
  data: unknown[],
  epochs: number,
  axesKeys: AxesKeys
) => {
  const tensors = getPreparedData(data, axesKeys);
  const { normalizedInputs, normalizedLabels } = tensors;

  return {
    modelParams: {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      epochs,
      tensors,
    },
  };
};

interface ModelConfig {
  inputs: Tensor;
  labels: Tensor;
  epochs: number;
}

const trainModel = async (
  model: tf.LayersModel,
  config: ModelConfig,
  onEpochEnd: Function
) => {
  const { inputs, epochs, labels } = config;
  compileModel(model);

  const BATCH_SIZE = 32;

  return await model.fit(inputs, labels, {
    batchSize: BATCH_SIZE,
    epochs,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        onEpochEnd({
          epoch: epoch + 1,
          ...logs,
        });
      },
    },
  });
};
