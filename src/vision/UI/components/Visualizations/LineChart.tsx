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
import { useTheme } from "@mui/material";

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
  const theme = useTheme();
  const colors = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        {Grid()}
        {Axes({ x: { key: xKey }, y: { key: yKey } })}
        <Legend />
        <Tooltip />
        {dataKeys.map((dataKey, i) => {
          const stroke = colors[i] ?? colors[0]
          return (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              dot={false}
            />
          );
        })}
      </ReLineChart>
    </ResponsiveContainer>
  );
};
