import { MnistData } from "../../data";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { ImageTensor } from "./Visualizations";
import { getModel, startTraining } from "../../model/digits";

const modelParams = {
  epochs: 10
}

export const Mnist = () => {
  const [imageTensors, setImageTensors] = useState<tf.Tensor<tf.Rank>[]>([]);
  const model = getModel();

  const handleEpochEnd = () => {}
  const handleTrainingEnd = () => {}

  useEffect(() => {
    const data = new MnistData();

    data.load().then(() => {
      const examples = data.nextTestBatch(20);
      const numExamples = examples.inputs.shape[0];
      let _imageTensors: tf.Tensor<tf.Rank>[] = [];

      for (let i = 0; i < numExamples; i++) {
        const newImageTensor = tf.tidy(() => {
          // Reshape the image to 28x28 px
          return examples.inputs
            .slice([i, 0], [1, examples.inputs.shape[1]])
            .reshape([28, 28, 1]);
        });
        _imageTensors = [..._imageTensors, newImageTensor];
      }

      setImageTensors(_imageTensors);

      startTraining(model, data, {
        modelParams,
        onEpochEnd: handleEpochEnd,
        onTrainingEnd: handleTrainingEnd,
      });
    });
  }, []);

  return (
    <>
      {imageTensors.map((tensor) => (
        <ImageTensor imageTensor={tensor} />
      ))}
    </>
  );
};
