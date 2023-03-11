import {
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartOptions } from "../../types/ChartOptions";
import React from "react";

interface LineChartProps {
  data: any[];
  options: ChartOptions;
}

export const LineChart = ({ data, options }: LineChartProps) => {
  console.log(data);
  return (
    <ReLineChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      {/* @ts-ignore */}
      <XAxis dataKey="epoch" />
      {/* @ts-ignore */}
      <YAxis dataKey="loss" />
      <Line type="monotone" dataKey="loss" stroke="#8884d8" />
      <Line type="monotone" dataKey="mse" stroke="#82ca9d" />
    </ReLineChart>
  );
};
