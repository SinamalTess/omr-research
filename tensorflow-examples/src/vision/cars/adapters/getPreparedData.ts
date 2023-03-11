import * as tf from "@tensorflow/tfjs";
import { NormalizedCar } from "../domain";
import { normalizeData } from "./normalizeData";
import { dataToTensors } from "./dataToTensors";

export function getPreparedData(data: NormalizedCar[]) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    tf.util.shuffle(data);

    const { inputTensor, labelTensor } = dataToTensors(data);

    return normalizeData({
      inputTensor,
      labelTensor,
    });
  });
}
