import React from "react";
import { LineChart } from "../../components";
import { TrainingData } from "../../../domain";

interface TrainingPreviewProps {
  data: TrainingData[];
}

const VALIDATION_KEY_PREFIX = "val_";

const getOptions = (
  metric: keyof TrainingData,
  validationMetricKey?: string
) => ({
  yKey: metric,
  xKey: "epoch",
  dataKeys: validationMetricKey ? [metric, validationMetricKey] : [metric],
});

export const TrainingPreview = ({ data }: TrainingPreviewProps) => {
  const firstItem = data[0];
  const keys = firstItem
    ? (Object.keys(firstItem) as Array<keyof TrainingData>)
    : [];
  const metrics = keys.filter((key) => key !== "epoch");
  const trainingMetrics = metrics.filter(
    (metric) => !metric.startsWith(VALIDATION_KEY_PREFIX)
  );

  const getValidationMetric = (
    validationMetricKey: keyof TrainingData,
    trainingData: TrainingData
  ) => {
    const validationMetricValue = validationMetricKey
      ? trainingData[validationMetricKey]
      : null;

    const hasValidationMetric = validationMetricValue && validationMetricKey;

    return hasValidationMetric
      ? {
          [validationMetricKey]: validationMetricValue,
        }
      : {};
  };

  const trainingData = trainingMetrics.map((metric, i) => {
    const validationMetricKey = metrics.find(
      (_metric) => _metric === VALIDATION_KEY_PREFIX + metric
    );

    return {
      data: data.map((trainingData) => {
        const validationMetric = validationMetricKey
          ? getValidationMetric(validationMetricKey, trainingData)
          : {};

        return {
          [metric]: trainingData[metric],
          ...validationMetric,
          epoch: trainingData.epoch,
        };
      }),
      options: getOptions(metric, validationMetricKey),
    };
  });

  return (
    <>
      {trainingData.map(({ data, options }) => (
        <LineChart data={data} options={options} />
      ))}
    </>
  );
};
