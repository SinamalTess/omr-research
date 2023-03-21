import { MnistData } from "../../../data";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { ImageTensor } from "../Visualizations";
import { getModel, startTraining } from "../../../model/digits";
import { ModelController } from "../../../domain";

const data = new MnistData();
const NB_PREVIEW_IMAGES = 20;
const TITLE = "Handwritten digit recognition";

export const Mnist = ({
  trainingStatus,
  epochs,
  onEpochEnd,
  onTrainingEnd,
  onModelChange,
  onTitleChange,
}: ModelController) => {
  const [imageTensors, setImageTensors] = useState<tf.Tensor<tf.Rank>[]>([]);
  const [model, setModel] = useState(getModel());

  useEffect(() => {
    const modelParams = {
      epochs,
    };

    if (trainingStatus === "training") {
      setModel(getModel());
      onModelChange(model);

      startTraining(model, data, {
        modelParams,
        onEpochEnd: onEpochEnd,
        onTrainingEnd: onTrainingEnd,
      });
    }
  }, [trainingStatus, epochs]);

  useEffect(() => {
    onTitleChange?.(TITLE);
    data.load().then(() => {
      const examples = data.nextTestBatch(NB_PREVIEW_IMAGES);
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
    });
  }, []);

  return (
    <>
      {imageTensors.map((tensor) => (
        <ImageTensor imageTensor={tensor} key={tensor.id} />
      ))}
    </>
  );
};
