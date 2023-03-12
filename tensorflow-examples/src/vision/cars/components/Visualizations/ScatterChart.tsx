import {
  Scatter,
  ScatterChart as ReScatterChart,
  Tooltip,
  Legend,
} from "recharts";
import { Coordinates } from "../../domain";
import React from "react";
import { BaseChartOptions } from "../../../types";
import { Grid } from "./Grid";
import { Axes } from "./Axes";

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
    <ReScatterChart height={500} width={500}>
      {Grid()}
      {Axes({ x: { key: xLabel }, y: { key: yLabel } })}
      <Legend />
      <Tooltip />
      <Scatter name={_name} data={data} fill="#8884d8" />
    </ReScatterChart>
  );
};
