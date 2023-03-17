import {
  Legend,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BaseChartOptions } from "../../../types";
import React from "react";
import { Grid } from "./Grid";
import { Axes } from "./Axes";

export interface LineChartOptions extends BaseChartOptions {
  xKey: string;
  yKey: string;
  dataKeys: string[];
}

interface LineChartProps {
  data: unknown[];
  options: LineChartOptions;
}

export const LineChart = ({ data, options }: LineChartProps) => {
  const { dataKeys, yKey, xKey } = options;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        {Grid()}
        {Axes({ x: { key: xKey }, y: { key: yKey } })}
        <Legend />
        <Tooltip />
        {dataKeys.map((dataKey) => (
          <Line
            key={dataKey}
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            dot={false}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};