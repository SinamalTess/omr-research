import * as tf from "@tensorflow/tfjs";
import { MnistData } from "../../data";

const classNames = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

export const getPredictions = (model: tf.LayersModel, data: MnistData) => {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const TEST_DATA_SIZE = 1;

  const testData = data.nextTestBatch(TEST_DATA_SIZE);
  const testxs = testData.inputs.reshape([
    TEST_DATA_SIZE,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    1,
  ]);
  const labels = testData.labels.argMax(-1);
  // @ts-ignore
  const preds = model.predict(testxs).argMax(-1);

  testxs.dispose();
  return [preds, labels];
};

export async function showAccuracy(model: tf.LayersModel, data: MnistData) {
  const [preds, labels] = getPredictions(model, data);
  // const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
  // const container = { name: "Accuracy", tab: "Evaluation" };
  // tfvis.show.perClassAccuracy(container, classAccuracy, classNames).then(() => {
  //   labels.dispose();
  // });
}

export async function showConfusion(model: tf.LayersModel, data: MnistData) {
  const [preds, labels] = getPredictions(model, data);
  // const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  // const container = { name: "Confusion Matrix", tab: "Evaluation" };
  // tfvis.render
  //   .confusionMatrix(container, {
  //     values: confusionMatrix,
  //     tickLabels: classNames,
  //   })
  //   .then(() => {
  //     labels.dispose();
  //   });
}
