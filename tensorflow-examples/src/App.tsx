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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
