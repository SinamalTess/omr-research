import React, {useState} from "react";
import "./App.css";
import { useData } from "./vision/cars/http/useData";
import { getModel, useTrainModel } from "./vision/cars/model";
import { ScatterChart } from "./vision/cars/components/ScatterChart";
import { dataToChartData } from "./vision/cars/adapters";
import { Dashboard } from "./vision/cars/components/Dashboard";
import { ModelSummary } from "./vision/cars/components/Table";
import { LineChart } from "./vision/cars/components/LineChart";

interface TrainingData {
  loss: number,
  mse: number,
  epoch: number
}

function App() {
  const [data] = useData();
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const chartData = dataToChartData(data);
  const options = {
    yLabel: "mpg",
    xLabel: "hp",
    name: "Horsepower vs MPG",
  };
  const model = getModel();

  const handleNewTrainingData = (trainingData: TrainingData) => {
    setDataTraining(prevState => [...prevState, trainingData])
  }

  useTrainModel(model, data, handleNewTrainingData);

  return (
    <div className="App">
      <Dashboard>
        <ScatterChart data={chartData} options={options} />
        <LineChart data={dataTraining} options={options} />
        <ModelSummary model={model} />
      </Dashboard>
    </div>
  );
}

export default App;
