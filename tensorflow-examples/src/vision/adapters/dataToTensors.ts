import { NormalizedCar } from "../domain";
import * as tf from "@tensorflow/tfjs";

export const dataToTensors = (data: NormalizedCar[]) => {
  const inputs = data.map((d) => d.horsepower);
  const labels = data.map((d) => d.mpg);

  const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
  const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

  return {
    inputTensor,
    labelTensor,
  };
};
