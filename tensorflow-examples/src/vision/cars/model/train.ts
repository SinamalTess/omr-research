import * as tf from "@tensorflow/tfjs";
import { getPreparedData } from "../adapters";
import { Tensor } from "@tensorflow/tfjs";
import { NormalizedCar } from "../domain";
import { compileModel } from "./compile";
import { testModel } from "./test";

interface TrainingConfig {
  epochs: number;
  onEpochEnd: Function;
  onTrainingEnd: Function;
}

export const startTraining = (
    model: tf.LayersModel,
    data: NormalizedCar[],
    config: TrainingConfig
) => {
  if (!data.length) return;
  const { onEpochEnd, onTrainingEnd } = config;
  const { modelParams } = getModelParams(data, config);
  const { tensors } = modelParams;

  trainModel(model, modelParams, onEpochEnd).then(() => {
    const predictedPoints = testModel(model, tensors);
    onTrainingEnd(predictedPoints);
  });
};

const getModelParams = (data: NormalizedCar[], config: TrainingConfig) => {
  const { epochs } = config;
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
        onEpochEnd({ epoch: epoch + 1, loss: logs?.loss ?? 0, mse: logs?.mse ?? 0 });
      },
    },
  });
};
