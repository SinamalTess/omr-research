import { Dashboard } from "../components/Dashboard";
import { ModelSummary } from "../components/Table";
import React, { useState } from "react";
import { useData } from "../http/useData";
import { dataToChartData } from "../adapters";
import { getModel, startTraining } from "../model";
import { DataPreview } from "./DataPreview";
import { TrainingPreview } from "./TrainingPreview";
import { TrainingData } from "../../types/TrainingData";
import { Button, Grid, Typography } from "@mui/material";

const model = getModel();

const options = {
  yLabel: "mpg",
  xLabel: "hp",
};

export const Home = () => {
  const [data] = useData();
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const chartData = dataToChartData(data);

  const handleEpochEnd = (trainingData: TrainingData) => {
    setDataTraining((prevState) => [...prevState, trainingData]);
  };

  const handleTrainingEnd = (predictions: any[]) => {
    setPredictions(predictions);
  };

  const handleClick = () => {
    setDataTraining([]);
    setPredictions([]);
    startTraining(model, data, handleEpochEnd, handleTrainingEnd);
  };

  return (
    <div className="App">
      <Dashboard>
        <Grid container item xs={12} justifyContent={"space-between"} alignItems={'center'}>
          <Typography variant="h2" component="h2">
            Horsepower vs MPG (miles per gallon)
          </Typography>
          <Button onClick={handleClick}>Run model</Button>
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
