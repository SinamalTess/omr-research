import { ModelSummary } from "../../components";
import React from "react";
import { MainPreview, Sidebar, Dashboard } from "../../components";
import { Coordinates } from "../../domain";
import { TrainingData } from "../../../types";
import * as tf from "@tensorflow/tfjs";
import {DataPreview} from "./DataPreview";
import {TrainingPreview} from "./TrainingPreview";

interface HomeProps {
  className?: string;
  dataPreview: Coordinates[];
  predictions: Coordinates[];
  model: tf.LayersModel;
  dataTraining: TrainingData[];
}

const options = {
  yLabel: "mpg",
  xLabel: "hp",
};

export const Home = ({
  className,
  dataPreview,
  predictions,
  dataTraining,
  model,
}: HomeProps) => {
  return (
    <Dashboard className={className}>
      <MainPreview>
        <DataPreview
          data={dataPreview}
          options={options}
          predictions={predictions}
        />
      </MainPreview>
      <Sidebar>
        <ModelSummary model={model} />
        <TrainingPreview data={dataTraining} />
      </Sidebar>
    </Dashboard>
  );
};
