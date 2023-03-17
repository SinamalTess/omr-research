import { ModelSummaryTable } from "../../components";
import React from "react";
import { MainPreview, Sidebar, Dashboard } from "../../components";
import { Coordinates } from "../../../domain";
import { TrainingData } from "../../../types";
import * as tf from "@tensorflow/tfjs";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { AxesKeys } from "../../../types/AxesKeys";

interface HomeProps {
  className?: string;
  dataPreview: Coordinates[];
  predictions: Coordinates[];
  model: tf.LayersModel;
  dataTraining: TrainingData[];
  axesKeys: AxesKeys;
}

export const Home = ({
  className,
  dataPreview,
  predictions,
  dataTraining,
  model,
  axesKeys,
}: HomeProps) => {
  const [xKey, yKey] = axesKeys

  const options = {
    yKey,
    xKey,
  };

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
        <ModelSummaryTable model={model} />
        <TrainingPreview data={dataTraining} />
      </Sidebar>
    </Dashboard>
  );
};
