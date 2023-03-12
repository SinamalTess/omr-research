import { Dashboard, ModelSummary, Controls } from "../components";
import React, { useState } from "react";
import { useData } from "../http";
import { dataToCoordinates } from "../adapters";
import { getModel, startTraining } from "../model";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { TrainingData } from "../../types";
import { Grid, Typography } from "@mui/material";
import { Coordinates } from "../domain";

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
  }

  const handleEpochsChanged = (newEpochsValue: number) => {
    reset();
    setEpochs(newEpochsValue);
  };

  const isTraining = trainingStatus === "training";

  return (
    <Dashboard className={className}>
      <Grid
        container
        item
        xs={12}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
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
      </Grid>
      <Grid container item xs={8}>
        <DataPreview
          data={chartData}
          options={options}
          predictions={predictions}
        />
      </Grid>
      <Grid container item xs={4} spacing={2}>
        <Grid item xs={12}>
          <ModelSummary model={model} />
        </Grid>
        <Grid item xs={12}>
          <TrainingPreview data={dataTraining} />
        </Grid>
      </Grid>
    </Dashboard>
  );
};
