import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BaseChartOptions } from "../../types";
import React from "react";
import { useTheme } from "@mui/material";

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
  const theme = useTheme();
  const colorAxes = theme.palette.grey[500];
  const colorGrid = theme.palette.grey[700];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid stroke={colorGrid} strokeDasharray="3" />
        <XAxis dataKey={xLabel} stroke={colorAxes} />
        <YAxis dataKey={yLabel} stroke={colorAxes} />
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
