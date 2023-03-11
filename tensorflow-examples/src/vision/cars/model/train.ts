import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { useEffect } from "react";
import { dataToTensors } from "../adapters";
import { getModel } from "./create";
import { Tensor } from "@tensorflow/tfjs";
import { NormalizedCar } from "../domain";
import { compileModel } from "./compile";
import { testModel } from "./test";

async function trainModel(
  model: tf.LayersModel,
  inputs: Tensor,
  labels: Tensor
) {
  compileModel(model);

  const batchSize = 32;
  const epochs = 50;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: "Training Performance" },
      ["loss", "mse"],
      { height: 200, callbacks: ["onEpochEnd"] }
    ),
  });
}

export function useTrainModel(data: NormalizedCar[]) {
  useEffect(() => {
    if (!data.length) return;
    // Convert the data to a form we can use for training.
    const tensors = dataToTensors(data);
    const { inputs, labels } = tensors;
    const model = getModel();

    trainModel(model, inputs, labels).then(() =>
      testModel(model, data, tensors)
    );
  }, [data]);
}
