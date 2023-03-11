import { Dashboard } from "../components/Dashboard";
import { ModelSummary } from "../components/Table";
import React, { useState } from "react";
import { useData } from "../http/useData";
import { dataToChartData } from "../adapters";
import { getModel, useTrainModel } from "../model";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { TrainingData } from "../../types/TrainingData";

export const Home = () => {
  const [data] = useData();
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const chartData = dataToChartData(data);
  const options = {
    yLabel: "mpg",
    xLabel: "hp",
  };
  const model = getModel();

  const handleTrainingData = (trainingData: TrainingData) => {
    setDataTraining((prevState) => [...prevState, trainingData]);
  };

  useTrainModel(model, data, handleTrainingData);

  return (
    <div className="App">
      <Dashboard>
        <ModelSummary model={model} />
        <DataPreview data={chartData} options={options} />
        <TrainingPreview data={dataTraining} />
      </Dashboard>
    </div>
  );
};
