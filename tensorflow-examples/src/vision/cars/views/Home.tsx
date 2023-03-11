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
import { Controls } from "../components/Controls";

const options = {
  yLabel: "mpg",
  xLabel: "hp",
};

type TrainingStatus = "waiting" | "training" | "done";

export const Home = () => {
  const [data] = useData();
  const [totalEpoch] = useState(50);
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [model, setModel] = useState(getModel());
  const [progress, setProgress] = useState(0);
  const [trainingStatus, setTrainingStatus] =
    useState<TrainingStatus>("waiting");
  const chartData = dataToChartData(data);

  const handleEpochEnd = (trainingData: TrainingData) => {
    const { epoch } = trainingData;
    setDataTraining((prevState) => [...prevState, trainingData]);
    setProgress((100 * epoch) / totalEpoch);
  };

  const handleTrainingEnd = (predictions: any[]) => {
    setPredictions(predictions);
    setTrainingStatus("done");
  };

  const handleClick = () => {
    setProgress(0);
    setTrainingStatus("training");
    setModel(getModel());
    setDataTraining([]);
    setPredictions([]);
    startTraining(model, data, totalEpoch, handleEpochEnd, handleTrainingEnd);
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
          <Controls
            totalEpoch={totalEpoch}
            isTraining={isTraining}
            progress={progress}
            onClick={handleClick}
          />
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
