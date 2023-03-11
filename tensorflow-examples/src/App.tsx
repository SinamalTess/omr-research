import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useChart, useData } from "./vision/cars/components/chart";
import { useShowModel, useTrainModel } from "./vision/cars/model";

function App() {
  const [data] = useData();

  useChart(data);
  useShowModel();
  useTrainModel(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World!</p>
        <div id={'test'} />
      </header>
    </div>
  );
}

export default App;
