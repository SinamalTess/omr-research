import { ScatterChartOptions } from "../components/ScatterChart";
import React from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCoordinate } from "recharts/types/util/types";

interface DataPreviewProps {
  data: ChartCoordinate[];
  options: ScatterChartOptions;
  predictions: any[];
}

export const DataPreview = ({
  data,
  options,
  predictions,
}: DataPreviewProps) => {
  const { name, yLabel, xLabel } = options;
  const _name = name ?? `${yLabel} vs ${xLabel}`;

  return (
    <ComposedChart height={500} width={500}>
      <CartesianGrid />
      {/* @ts-ignore */}
      <XAxis type="number" dataKey="x" name={xLabel} unit={xLabel} />
      {/* @ts-ignore */}
      <YAxis type="number" dataKey="y" name={yLabel} unit={yLabel} />
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
        />
      ) : null}
    </ComposedChart>
  );
};
