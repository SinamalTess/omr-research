import * as tf from "@tensorflow/tfjs";
import { normalizeData } from "./normalizeData";
import { dataToTensors } from "./dataToTensors";
import { AxesKeys } from "../types/AxesKeys";

export const getPreparedData = (data: unknown[], axesKeys: AxesKeys) => {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    tf.util.shuffle(data);

    const { inputTensor, labelTensor } = dataToTensors(data, axesKeys);

    return normalizeData({
      inputTensor,
      labelTensor,
    });
  });
};
