import * as tf from "@tensorflow/tfjs";
import { getPreparedData } from "../adapters";
import { Tensor } from "@tensorflow/tfjs";
import { NormalizedCar } from "../domain";
import { compileModel } from "./compile";
import { testModel } from "./test";

const trainModel = async (
  model: tf.LayersModel,
  inputs: Tensor,
  labels: Tensor,
  totalEpoch: number,
  onEpochEnd: Function
) => {
  compileModel(model);

  const batchSize = 32;
  const epochs = totalEpoch;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        onEpochEnd({ epoch, loss: logs?.loss ?? 0, mse: logs?.mse ?? 0 });
      },
    },
  });
};

export const startTraining = (
  model: tf.LayersModel,
  data: NormalizedCar[],
  totalEpoch: number,
  onEpochEnd: Function,
  onTrainingEnd: Function
) => {
  if (!data.length) return;
  const tensors = getPreparedData(data);
  const { normalizedInputs, normalizedLabels } = tensors;

  trainModel(
    model,
    normalizedInputs,
    normalizedLabels,
    totalEpoch,
    onEpochEnd
  ).then(() => {
    const predictedPoints = testModel(model, data, tensors);
    onTrainingEnd(predictedPoints);
  });
};
