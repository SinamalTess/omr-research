import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
} from "recharts";
import { BaseChartOptions } from "../../types/ChartOptions";
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
    <ReLineChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      {/* @ts-ignore */}
      <XAxis dataKey={xLabel} />
      {/* @ts-ignore */}
      <YAxis dataKey={yLabel} />
      <Legend />
      {dataKeys.map((dataKey) => (
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      ))}
    </ReLineChart>
  );
};
