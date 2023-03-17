import * as tf from "@tensorflow/tfjs";
import { Coordinates } from "../../domain";

export interface NormalizationData {
  inputMax: tf.Tensor<tf.Rank>;
  inputMin: tf.Tensor<tf.Rank>;
  labelMin: tf.Tensor<tf.Rank>;
  labelMax: tf.Tensor<tf.Rank>;
}

// Generate predictions for a uniform range of numbers between 0 and 1;
// We un-normalize the data by doing the inverse of the min-max scaling
// that we did earlier.
export const getPredictions = (
  model: tf.LayersModel,
  normalizationData: NormalizationData
): Coordinates[] => {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  const [inputs, predictions] = tf.tidy(() => {
    const normalizedInputs = tf.linspace(0, 1, 100);
    const predictions = model.predict(normalizedInputs.reshape([100, 1]));

    const unNormalizedInputs = normalizedInputs.mul(inputMax.sub(inputMin)).add(inputMin);

    // @ts-ignore
    const unNormalizedPredictions = predictions.mul(labelMax.sub(labelMin)).add(labelMin);

    // Un-normalize the data
    return [unNormalizedInputs.dataSync(), unNormalizedPredictions.dataSync()];
  });

  const predictedPoints = Array.from(inputs).map((value, i) => {
    return { x: value, y: predictions[i] };
  });

  return predictedPoints;
};
