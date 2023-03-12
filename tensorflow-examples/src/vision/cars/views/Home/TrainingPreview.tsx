import React from "react";
import { LineChart } from "../../components";
import { TrainingData } from "../../../types";

interface TrainingPreviewProps {
  data: TrainingData[];
}

const getOptions = (label: "mse" | "loss") => ({
  yLabel: label,
  xLabel: "epoch",
  dataKeys: [label],
});

export const TrainingPreview = ({ data }: TrainingPreviewProps) => {
  const lossData = data.map((value) => ({
    loss: value.loss,
    epoch: value.epoch,
  }));

  const mseData = data.map((value) => ({
    mse: value.mse,
    epoch: value.epoch,
  }));

  const optionsLoss = getOptions("loss");
  const optionsMse = getOptions("mse");

  return (
    <>
      <LineChart data={lossData} options={optionsLoss} />
      <LineChart data={mseData} options={optionsMse} />
    </>
  );
};
