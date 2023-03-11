import * as tf from "@tensorflow/tfjs";

export function compileModel(model: tf.LayersModel) {
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ["mse"],
    });
}
