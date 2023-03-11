import {
  CartesianGrid,
  Scatter,
  ScatterChart as ReScatterChart,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import { Coordinates } from "../domain/coordinates.entity";
import { ChartOptions } from "../../types/ChartOptions";
import React from "react";

interface ScatterChartProps {
  data: Coordinates[];
  options: ChartOptions;
}

export const ScatterChart = ({ data, options }: ScatterChartProps) => {
  const { name, yLabel, xLabel } = options;
  return (
    // @ts-ignore
    <ReScatterChart height={500} width={500}>
      <CartesianGrid />
      {/* @ts-ignore */}
      <XAxis type="number" dataKey="x" name={xLabel} unit={xLabel} />
      {/* @ts-ignore */}
      <YAxis type="number" dataKey="y" name={yLabel} unit={yLabel} />
      <Legend />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter name={name} data={data} fill="#8884d8" />
    </ReScatterChart>
  );
};
