import React from "react";
import { LineChart } from "../components/LineChart";
import { TrainingData } from "../../types/TrainingData";

interface TrainingPreviewProps {
  data: TrainingData[];
}

export const TrainingPreview = ({ data }: TrainingPreviewProps) => {
  const lossData = data.map((value) => ({
    loss: value.loss,
    epoch: value.epoch,
  }));

  const mseData = data.map((value) => ({
    mse: value.mse,
    epoch: value.epoch,
  }));

  const optionsLoss = {
    yLabel: "loss",
    xLabel: "epoch",
    dataKeys: ["loss"],
  };

  const optionsMse = {
    yLabel: "mse",
    xLabel: "epoch",
    dataKeys: ["mse"],
  };

  return (
    <>
      <LineChart data={lossData} options={optionsLoss} />
      <LineChart data={mseData} options={optionsMse} />
    </>
  );
};
