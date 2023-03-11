import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { useEffect } from "react";
import { convertDataToTensors } from "../adapters";
import { getModel } from "./create";
import { Tensor } from "@tensorflow/tfjs";
import {NormalizedCar} from "../domain";

async function trainModel(
  model: tf.LayersModel,
  inputs: Tensor,
  labels: Tensor
) {
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"],
  });

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
    const tensorData = convertDataToTensors(data);
    const { inputs, labels } = tensorData;
    const model = getModel();

    trainModel(model, inputs, labels).then(() => console.log("Done Training"));
  }, [data]);
}
