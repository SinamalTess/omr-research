import * as tf from "@tensorflow/tfjs";
import { compileModel } from "./compile";
import { showAccuracy, showConfusion} from "./test";
import { MnistData } from "../../data";

interface TrainingConfig {
  onEpochEnd: Function;
  onTrainingEnd: Function;
  modelParams: ModelConfig;
}

export const startTraining = (
  model: tf.LayersModel,
  data: MnistData,
  config: TrainingConfig
) => {
  if (!data) return;
  const { onEpochEnd, onTrainingEnd, modelParams } = config;

  trainModel(model, modelParams, onEpochEnd, data).then((History) => {
    showAccuracy(model, data)
    showConfusion(model, data)
    // const losses = History.history.loss;
    // const finalLoss = losses[Math.max(losses.length - 1, 0)];
    // const predictedPoints = getPredictions(model, tensors);
    // onTrainingEnd(predictedPoints, finalLoss);
  });
};

interface ModelConfig {
  epochs: number;
}

const getValidationData = (data: MnistData) => {
  const TRAIN_DATA_SIZE = 5500;
  const TEST_DATA_SIZE = 1000;
  // Training set that we will train the model on
  // Xs = inputs
  // Ys = labels
  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [d.inputs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
  });

  // Validation set that we will test the model on at the end of each epoch
  // Note : the validation data is never shown to the model during training.
  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [d.inputs.reshape([TEST_DATA_SIZE, 28, 28, 1]), d.labels];
  });

  return {
    trainXs,
    trainYs,
    testXs,
    testYs,
  };
};

const trainModel = async (
  model: tf.LayersModel,
  config: ModelConfig,
  onEpochEnd: Function,
  data: MnistData
) => {
  const { epochs } = config;
  compileModel(model);

  const BATCH_SIZE = 512;

  const { testXs, testYs, trainXs, trainYs } = getValidationData(data);

  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: 10,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        onEpochEnd({
          epoch: epoch + 1,
          ...logs
        });
      },
    },
  });
};
