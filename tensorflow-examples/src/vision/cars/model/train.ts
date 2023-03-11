import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";
import { dataToTensors } from "../adapters";
import { Tensor } from "@tensorflow/tfjs";
import { NormalizedCar } from "../domain";
import { compileModel } from "./compile";
import { testModel } from "./test";

async function trainModel(
  model: tf.LayersModel,
  inputs: Tensor,
  labels: Tensor,
  onEpochEnd: Function
) {
  compileModel(model);

  const batchSize = 32;
  const epochs = 50;

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
}

export function useTrainModel(
  model: tf.LayersModel,
  data: NormalizedCar[],
  onEpochEnd: Function
) {
  useEffect(() => {
    if (!data.length) return;
    // Convert the data to a form we can use for training.
    const tensors = dataToTensors(data);
    const { normalizedInputs, normalizedLabels } = tensors;

    trainModel(model, normalizedInputs, normalizedLabels, onEpochEnd).then(() =>
      testModel(model, data, tensors)
    );
  }, [data]);
}
