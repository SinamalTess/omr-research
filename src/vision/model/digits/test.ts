import * as tf from "@tensorflow/tfjs";
import { MnistData } from "../../data";

export const getPredictionsTensors = (
  model: tf.LayersModel,
  data: MnistData
) => {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const TEST_DATA_SIZE = 2;

  const testData = data.nextTestBatch(TEST_DATA_SIZE);
  const testxs = testData.inputs.reshape([
    TEST_DATA_SIZE,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    1,
  ]);
  const labels = testData.labels.argMax(-1);
  // @ts-ignore
  const predictions = model.predict(testxs).argMax(-1);

  testxs.dispose();

  return [predictions, labels];
};

export const getPredictions = (model: tf.LayersModel, data: MnistData) => {
  const [preds, labels] = getPredictionsTensors(model, data);

  const predictions = [...preds.dataSync()];
  const _labels = [...labels.dataSync()];

  return [predictions, _labels];
};
