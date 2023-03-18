import { ModelSummaryTable } from "../../components";
import React from "react";
import { MainPreview, Sidebar, Dashboard } from "../../components";
import { Coordinates } from "../../../domain";
import { TrainingData } from "../../../types";
import * as tf from "@tensorflow/tfjs";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { AxesKeys } from "../../../types/AxesKeys";
import { EvaluationData } from "../../../types/EvaluationData";

interface HomeProps {
  className?: string;
  dataPreview: Coordinates[];
  evaluationData?: EvaluationData;
  model: tf.LayersModel;
  dataTraining: TrainingData[];
  axesKeys: AxesKeys;
}

export const Home = ({
  className,
  dataPreview,
  evaluationData,
  dataTraining,
  model,
  axesKeys,
}: HomeProps) => {
  const [xKey, yKey] = axesKeys;

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
          evaluationData={evaluationData}
        />
      </MainPreview>
      <Sidebar>
        <ModelSummaryTable model={model} />
        <TrainingPreview data={dataTraining} />
      </Sidebar>
    </Dashboard>
  );
};
