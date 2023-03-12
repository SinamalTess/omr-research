import * as tf from "@tensorflow/tfjs";
import { getPreparedData } from "../adapters";
import { Tensor } from "@tensorflow/tfjs";
import { NormalizedCar } from "../domain";
import { compileModel } from "./compile";
import { NormalizationData, testModel } from "./test";

interface TrainingConfig {
  onEpochEnd: Function;
  onTrainingEnd: Function;
  modelParams: ModelParams ;
}

export interface Tensors extends NormalizationData {
  normalizedInputs: tf.Tensor<tf.Rank>,
  normalizedLabels: tf.Tensor<tf.Rank>,
}

interface ModelParams extends ModelConfig {
  tensors: Tensors;
}

export const startTraining = (
  model: tf.LayersModel,
  data: NormalizedCar[],
  config: TrainingConfig
) => {
  if (!data.length) return;
  const { onEpochEnd, onTrainingEnd, modelParams } = config;
  const { tensors } = modelParams;

  trainModel(model, modelParams, onEpochEnd).then(() => {
    const predictedPoints = testModel(model, tensors);
    onTrainingEnd(predictedPoints);
  });
};

export const getModelParams = (data: NormalizedCar[], epochs: number) => {
  const tensors = getPreparedData(data);
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

  const batchSize = 32;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        onEpochEnd({
          epoch: epoch + 1,
          loss: logs?.loss ?? 0,
          mse: logs?.mse ?? 0,
        });
      },
    },
  });
};
