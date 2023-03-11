import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { NormalizedCar } from "../domain";

interface NormalizationData {
  inputMax: tf.Tensor<tf.Rank>;
  inputMin: tf.Tensor<tf.Rank>;
  labelMin: tf.Tensor<tf.Rank>;
  labelMax: tf.Tensor<tf.Rank>;
}

export const testModel = (
  model: tf.LayersModel,
  inputData: any,
  normalizationData: NormalizationData
) => {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    const xsNorm = tf.linspace(0, 1, 100);
    const predictions = model.predict(xsNorm.reshape([100, 1]));

    const unNormXs = xsNorm.mul(inputMax.sub(inputMin)).add(inputMin);

    // @ts-ignore
    const unNormPreds = predictions.mul(labelMax.sub(labelMin)).add(labelMin);

    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });

  const predictedPoints = Array.from(xs).map((val, i) => {
    return { x: val, y: preds[i] };
  });

  const originalPoints = inputData.map((data: NormalizedCar) => ({
    x: data.horsepower,
    y: data.mpg,
  }));

  tfvis.render.scatterplot(
    { name: "Model Predictions vs Original Data" },
    {
      values: [originalPoints, predictedPoints],
      series: ["original", "predicted"],
    },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300,
    }
  );
};
