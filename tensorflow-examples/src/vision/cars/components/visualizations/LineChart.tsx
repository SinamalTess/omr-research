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
  xLabel: string;
  yLabel: string;
  dataKeys: string[];
}

interface LineChartProps {
  data: any[];
  options: LineChartOptions;
}

export const LineChart = ({ data, options }: LineChartProps) => {
  const { dataKeys, yLabel, xLabel } = options;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        {Grid()}
        {Axes({ x: { key: xLabel }, y: { key: yLabel } })}
        <Legend />
        <Tooltip />
        {dataKeys.map((dataKey) => (
          <Line
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
