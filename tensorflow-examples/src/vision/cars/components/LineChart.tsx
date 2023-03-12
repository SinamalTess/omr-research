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
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey={xLabel} />
        <YAxis dataKey={yLabel} />
        <Legend />
        <Tooltip />
        {dataKeys.map((dataKey) => (
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};
