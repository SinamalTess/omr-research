import * as tf from "@tensorflow/tfjs";
import {AxesKeys} from "../../types/AxesKeys";
import {isObject} from "../../types/utils";

export interface NormalizationData {
  inputMax: tf.Tensor<tf.Rank>;
  inputMin: tf.Tensor<tf.Rank>;
  labelMin: tf.Tensor<tf.Rank>;
  labelMax: tf.Tensor<tf.Rank>;
}

// Generate predictions for a uniform range of numbers between 0 and 1;
// We un-normalize the data by doing the inverse of the min-max scaling
// that we did earlier.
const getPredictionsTensors = (
  model: tf.LayersModel,
  normalizationData: NormalizationData
) => {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  const [inputs, predictions] = tf.tidy(() => {
    const normalizedInputs = tf.linspace(0, 1, 100);
    const predictions = model.predict(normalizedInputs.reshape([100, 1]));

    const unNormalizedInputs = normalizedInputs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);

    const unNormalizedPredictions = predictions
      // @ts-ignore
      .mul(labelMax.sub(labelMin))
      .add(labelMin);

    // Un-normalize the data
    return [unNormalizedInputs, unNormalizedPredictions];
  });

  return [inputs, predictions]
};

export const getPredictions = (
  model: tf.LayersModel,
  normalizationData: NormalizationData,
  data: unknown[],
  axesKeys: AxesKeys
) => {
  const [inputs, predictions] = getPredictionsTensors(model, normalizationData);
  const [_inputs, _predictions] = [inputs.dataSync(), predictions.dataSync()]
  const [xKey, yKey] = axesKeys

  const predictedPoints = Array.from(_inputs).map((value, i) => {
    return { [xKey]: value, [yKey]: _predictions[i] };
  });

  const originalPoints = data.map((d) => ({
    [xKey]: isObject(d) && xKey in d ? d[xKey] : null,
    [yKey]: isObject(d) && yKey in d ? d[yKey] : null,
  }));

  return [predictedPoints, originalPoints];
};
