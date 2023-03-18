import React from "react";
import { LineChart } from "../../components";
import { TrainingData } from "../../../types";

interface TrainingPreviewProps {
  data: TrainingData[];
}

const getOptions = (label: keyof TrainingData) => ({
  yKey: label,
  xKey: "epoch",
  dataKeys: [label],
});

export const TrainingPreview = ({ data }: TrainingPreviewProps) => {
  const keys = data[0] ? Object.keys(data[0]) as Array<keyof TrainingData> : [];
  const metrics  = keys ? keys.filter((key) => key !== "epoch") : [];

  const trainingData = metrics.map((metric) =>
    data.map((value) => ({
      [metric]: value[metric],
      epoch: value.epoch,
    }))
  );

  return (
    <>
      {trainingData.map((data, i) => (
        <LineChart data={data} options={getOptions(metrics[i])} />
      ))}
    </>
  );
};
