import { ScatterChartOptions, Grid } from "../../components";
import React from "react";
import {
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
} from "recharts";
import { ChartCoordinate } from "recharts/types/util/types";
import { Axes } from "../../components/Visualizations/Axes";
import { StyledTable } from "../../components/StyledTable";
import {
  Evaluation2DData,
  EvaluationData,
  isEvaluation2DData,
} from "../../../types";

interface DataPreviewProps {
  data: ChartCoordinate[];
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
    content: [{ key: "yooho", content: <>{prediction}</> }, { key: "yooho", content: <>{labels[i]}</> }],
  }));

  return <StyledTable headings={headings} rows={rows} />;
};

export const DataPreview = ({
  data,
  options,
  evaluationData,
}: DataPreviewProps) => {
  const { name, yKey, xKey } = options;
  const _name = name ?? `${yKey} vs ${xKey}`;
  const hasEvaluationData = Boolean(evaluationData?.length);

  if (!hasEvaluationData) return null;

  const [predictions, labels] = evaluationData as EvaluationData;

  return isEvaluation2DData(evaluationData) ? (
    <TableTest evaluationData={evaluationData} />
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart>
        {Grid()}
        {Axes({ x: { key: "x", unit: xKey }, y: { key: "y", unit: yKey } })}
        <Legend />
        <Tooltip />
        <Scatter name={_name} fill="#8884d8" data={data} />
        {predictions.length ? (
          <Line
            name={"predictions"}
            fill="#8884d8"
            data={predictions}
            dataKey={"y"}
            strokeWidth={3}
            dot={false}
          />
        ) : null}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
