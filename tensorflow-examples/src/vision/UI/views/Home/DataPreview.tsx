import { ScatterChartOptions } from "../../components";
import React from "react";
import { StyledTable } from "../../components/StyledTable";
import {
  Evaluation2DData,
  EvaluationData,
  isEvaluation2DData,
} from "../../../types";
import { ScatterPreview } from "./ScatterPreview";
import { Coordinates } from "../../../domain";

interface DataPreviewProps {
  data: unknown[];
  options: ScatterChartOptions;
  evaluationData?: EvaluationData;
}

interface TableTestProps {
  evaluationData: Evaluation2DData;
}

const TableTest = ({ evaluationData }: TableTestProps) => {
  const headings = ["predictions", "labels"];
  const [predictions, labels] = evaluationData;
  const rows = predictions.map((prediction, i) => ({
    key: "test",
    content: [
      { key: "yooho", content: <>{prediction}</> },
      { key: "yooho", content: <>{labels[i]}</> },
    ],
  }));

  return <StyledTable headings={headings} rows={rows} />;
};

export const DataPreview = ({
  data,
  options,
  evaluationData,
}: DataPreviewProps) => {
  const hasEvaluationData = Boolean(evaluationData?.length);
  const hasData = Boolean(data?.length);

  if (!hasEvaluationData) return null;

  const [predictions, labels] = evaluationData as EvaluationData;

  if (isEvaluation2DData(evaluationData))
    return <TableTest evaluationData={evaluationData} />;

  else if (hasData) return <ScatterPreview
      data={data}
      options={options}
      predictions={predictions as Coordinates[]}
  />

  return null
};
