import * as tf from "@tensorflow/tfjs";
import { AxesKeys } from "../types/AxesKeys";
import { isObject } from "../types/utils";

export const dataToTensors = (data: unknown[], axesKeys: AxesKeys) => {
  const [inputKey, labelKey] = axesKeys;
  const inputs = data
    .map((d) => (isObject(d) && inputKey in d ? d[inputKey] : null))
    .filter(Number);

  const labels = data
    .map((d) => (isObject(d) && inputKey in d ? d[labelKey] : null))
    .filter(Number);

  const inputTensor = tf.tensor2d(inputs as number[], [inputs.length, 1]);
  const labelTensor = tf.tensor2d(labels as number[], [labels.length, 1]);

  return {
    inputTensor,
    labelTensor,
  };
};
