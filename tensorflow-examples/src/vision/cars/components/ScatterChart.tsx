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
import React from "react";
import { BaseChartOptions } from "../../types/ChartOptions";

export interface ScatterChartOptions extends BaseChartOptions {
  xLabel: string;
  yLabel: string;
}

interface ScatterChartProps {
  data: Coordinates[];
  options: ScatterChartOptions;
}

export const ScatterChart = ({ data, options }: ScatterChartProps) => {
  const { name, yLabel, xLabel } = options;
  const _name = name ?? `${yLabel} vs ${xLabel}`;
  return (
    // @ts-ignore
    <ReScatterChart height={500} width={500}>
      <CartesianGrid />
      {/* @ts-ignore */}
      <XAxis type="number" dataKey="x" name={xLabel} unit={xLabel} />
      {/* @ts-ignore */}
      <YAxis type="number" dataKey="y" name={yLabel} unit={yLabel} />
      <Legend />
      <Tooltip />
      <Scatter name={_name} data={data} fill="#8884d8" />
    </ReScatterChart>
  );
};
