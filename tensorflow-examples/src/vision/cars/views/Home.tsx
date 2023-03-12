import { ModelSummary, Controls } from "../components";
import React, { useState } from "react";
import { useData } from "../http";
import { dataToCoordinates } from "../adapters";
import { getModel, startTraining } from "../model";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { TrainingData } from "../../types";
import { Typography } from "@mui/material";
import { Coordinates } from "../domain";
import { Navbar } from "../components/Dashboard/Navbar";
import { MainPreview } from "../components/Dashboard/MainPreview";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Dashboard } from "../components";

const options = {
  yLabel: "mpg",
  xLabel: "hp",
};

type TrainingStatus = "waiting" | "training" | "done";

interface HomeProps {
  className?: string;
}

export const Home = ({ className }: HomeProps) => {
  const [data] = useData();
  const [epochs, setEpochs] = useState(50);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const [predictions, setPredictions] = useState<Coordinates[]>([]);
  const [model, setModel] = useState(getModel());
  const [trainingStatus, setTrainingStatus] =
    useState<TrainingStatus>("waiting");
  const chartData = dataToCoordinates(data);

  const reset = () => {
    setCurrentEpoch(0);
    setModel(getModel());
    setDataTraining([]);
    setPredictions([]);
  };

  const handleEpochEnd = (trainingData: TrainingData) => {
    const { epoch } = trainingData;
    setDataTraining((prevState) => [...prevState, trainingData]);
    setCurrentEpoch(epoch);
  };

  const handleTrainingEnd = (predictions: Coordinates[]) => {
    setPredictions(predictions);
    setTrainingStatus("done");
  };

  const train = () => {
    reset();
    setTrainingStatus("training");
    startTraining(model, data, {
      epochs,
      onEpochEnd: handleEpochEnd,
      onTrainingEnd: handleTrainingEnd,
    });
  };

  const handleEpochsChanged = (newEpochsValue: number) => {
    reset();
    setEpochs(newEpochsValue);
  };

  const isTraining = trainingStatus === "training";

  return (
    <Dashboard className={className}>
      <Navbar>
        <Typography variant="h4" component="h1" color={"primary"}>
          Horsepower vs MPG (miles per gallon)
        </Typography>
        <Controls
          epochs={epochs}
          currentEpoch={currentEpoch}
          isTraining={isTraining}
          onClick={train}
          onChangeEpochs={handleEpochsChanged}
          onEnterKeyDown={train}
        />
      </Navbar>
      <MainPreview>
        <DataPreview
          data={chartData}
          options={options}
          predictions={predictions}
        />
      </MainPreview>
      <Sidebar>
        <ModelSummary model={model} />
        <TrainingPreview data={dataTraining} />
      </Sidebar>
    </Dashboard>
  );
};
