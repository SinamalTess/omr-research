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
  const [predictions, setPredictions] = useState<any[]>([]);
  const chartData = dataToChartData(data);
  const options = {
    yLabel: "mpg",
    xLabel: "hp",
  };
  const model = getModel();

  const handleEpochEnd = (trainingData: TrainingData) => {
    setDataTraining((prevState) => [...prevState, trainingData]);
  };

  const handleTrainingEnd = (predictions: any[]) => {
    setPredictions(predictions);
  };

  useTrainModel(model, data, handleEpochEnd, handleTrainingEnd);

  return (
    <div className="App">
      <Dashboard>
        <ModelSummary model={model} />
        <DataPreview data={chartData} options={options} predictions={predictions}/>
        <TrainingPreview data={dataTraining} />
      </Dashboard>
    </div>
  );
};
