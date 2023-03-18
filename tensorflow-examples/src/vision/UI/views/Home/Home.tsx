import { ModelSummaryTable, ScatterChartOptions } from "../../components";
import React from "react";
import { MainPreview, Sidebar, Dashboard } from "../../components";
import { Coordinates } from "../../../domain";
import * as tf from "@tensorflow/tfjs";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { EvaluationData, AxesKeys, TrainingData } from "../../../types";
import { Sequential } from "@tensorflow/tfjs";

interface HomeProps {
  className?: string;
  dataPreview: Coordinates[];
  evaluationData?: EvaluationData;
  model: Sequential | null;
  dataTraining: TrainingData[];
  axesKeys: AxesKeys | [];
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
        {options.yKey && options.xKey ? (
          <DataPreview
            data={dataPreview}
            options={options as ScatterChartOptions}
            evaluationData={evaluationData}
          />
        ) : (
          <></>
        )}
      </MainPreview>
      <Sidebar>
        {model ? <ModelSummaryTable model={model} /> : <></>}
        <TrainingPreview data={dataTraining} />
      </Sidebar>
    </Dashboard>
  );
};
