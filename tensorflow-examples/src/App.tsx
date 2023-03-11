import React from "react";
import "./App.css";
import { useData } from "./vision/cars/http/useData";
import { getModel, useTrainModel } from "./vision/cars/model";
import { ScatterChart } from "./vision/cars/components/ScatterChart";
import { dataToChartData } from "./vision/cars/adapters";
import { Dashboard } from "./vision/cars/components/Dashboard";
import { ModelSummary } from "./vision/cars/components/Table";

function App() {
  const [data] = useData();
  const chartData = dataToChartData(data);
  const model = getModel();

  useTrainModel(data);

  return (
    <div className="App">
      <Dashboard>
        <ScatterChart
          data={chartData}
          yLabel={"mpg"}
          xLabel={"hp"}
          name={"Horsepower vs MPG"}
        />
        <ModelSummary model={model} />
      </Dashboard>
    </div>
  );
}

export default App;
