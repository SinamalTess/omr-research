import {
  Scatter,
  ScatterChart as ReScatterChart,
  Tooltip,
  Legend,
} from "recharts";
import { Coordinates } from "../../../domain";
import React from "react";
import { BaseChartOptions } from "../../../types";
import { Grid } from "./Grid";
import { Axes } from "./Axes";

export interface ScatterChartOptions extends BaseChartOptions {
  xKey: string;
  yKey: string;
}

interface ScatterChartProps {
  data: Coordinates[];
  options: ScatterChartOptions;
}

export const ScatterChart = ({ data, options }: ScatterChartProps) => {
  const { name, yKey, xKey } = options;
  const _name = name ?? `${yKey} vs ${xKey}`;
  return (
    <ReScatterChart height={500} width={500}>
      {Grid()}
      {Axes({ x: { key: xKey }, y: { key: yKey } })}
      <Legend />
      <Tooltip />
      <Scatter name={_name} data={data} fill="#8884d8" />
    </ReScatterChart>
  );
};
