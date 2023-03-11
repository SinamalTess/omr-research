import { Dashboard } from "../components/Dashboard";
import { ModelSummary } from "../components/Table";
import React, { useState } from "react";
import { useData } from "../http/useData";
import { dataToChartData } from "../adapters";
import { getModel, startTraining } from "../model";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { TrainingData } from "../../types/TrainingData";
import { Grid, Typography } from "@mui/material";
import { TrainButton } from "../components/TrainButton";

const options = {
  yLabel: "mpg",
  xLabel: "hp",
};

type TrainingStatus = "waiting" | "training" | "done";

export const Home = () => {
  const [data] = useData();
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [model, setModel] = useState(getModel());
  const [trainingStatus, setTrainingStatus] =
    useState<TrainingStatus>("waiting");
  const chartData = dataToChartData(data);

  const handleEpochEnd = (trainingData: TrainingData) => {
    setDataTraining((prevState) => [...prevState, trainingData]);
  };

  const handleTrainingEnd = (predictions: any[]) => {
    setPredictions(predictions);
    setTrainingStatus("done");
  };

  const handleClick = () => {
    setTrainingStatus("training");
    setModel(getModel());
    setDataTraining([]);
    setPredictions([]);
    startTraining(model, data, handleEpochEnd, handleTrainingEnd);
  };

  const isTraining = trainingStatus === "training";

  return (
    <div className="App">
      <Dashboard>
        <Grid
          container
          item
          xs={12}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h2" component="h2">
            Horsepower vs MPG (miles per gallon)
          </Typography>
          <TrainButton isLoading={isTraining} onClick={handleClick} />
        </Grid>
        <Grid item xs={8}>
          <DataPreview
            data={chartData}
            options={options}
            predictions={predictions}
          />
        </Grid>
        <Grid item xs={4}>
          <ModelSummary model={model} />
          <TrainingPreview data={dataTraining} />
        </Grid>
      </Dashboard>
    </div>
  );
};
