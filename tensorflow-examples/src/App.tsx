import React from "react";
import "./App.css";
import { useData } from "./vision/cars/http/useData";
import { useShowModel, useTrainModel } from "./vision/cars/model";
import { ScatterChart } from "./vision/cars/components/ScatterChart";
import { dataToChartData } from "./vision/cars/adapters";

function App() {
  const [data] = useData();
  const chartData = dataToChartData(data);

  useShowModel();
  useTrainModel(data);

  return (
    <div className="App">
      <header className="App-header">
        <ScatterChart
          data={chartData}
          yLabel={"mpg"}
          xLabel={"hp"}
          name={"Horsepower vs MPG"}
        />
      </header>
    </div>
  );
}

export default App;
