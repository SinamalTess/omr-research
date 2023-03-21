import * as tf from "@tensorflow/tfjs";

export const compileModel = (model: tf.LayersModel) => {
  model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });
};
