import * as tf from "@tensorflow/tfjs";
import { NormalizedCar } from "../domain";
import { normalizeData } from "./normalizeData";

export function dataToTensors(data: NormalizedCar[]) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // Step 1. Shuffle the data
    tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map((d) => d.horsepower);
    const labels = data.map((d) => d.mpg);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    return normalizeData({
        inputTensor,
        labelTensor,
    });
  });
}
