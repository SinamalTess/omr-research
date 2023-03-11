import { Dashboard } from "../components/Dashboard";
import { ScatterChart } from "../components/ScatterChart";
import { LineChart } from "../components/LineChart";
import { ModelSummary } from "../components/Table";
import React, { useState } from "react";
import { useData } from "../http/useData";
import { dataToChartData } from "../adapters";
import { getModel, useTrainModel } from "../model";

interface TrainingData {
  loss: number;
  mse: number;
  epoch: number;
}

export const Home = () => {
  const [data] = useData();
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const chartData = dataToChartData(data);
  const options = {
    yLabel: "mpg",
    xLabel: "hp",
    name: "Horsepower vs MPG",
  };
  const model = getModel();

  const handleTrainingData = (trainingData: TrainingData) => {
    setDataTraining((prevState) => [...prevState, trainingData]);
  };

  useTrainModel(model, data, handleTrainingData);

  return (
    <div className="App">
      <Dashboard>
        <ScatterChart data={chartData} options={options} />
        <LineChart data={dataTraining} options={options} />
        <ModelSummary model={model} />
      </Dashboard>
    </div>
  );
};
