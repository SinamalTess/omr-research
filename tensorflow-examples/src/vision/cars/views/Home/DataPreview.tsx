import { ScatterChartOptions, Grid } from "../../components";
import React from "react";
import {
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
} from "recharts";
import { ChartCoordinate } from "recharts/types/util/types";
import { Axes } from "../../components/Visualizations/Axes";

interface DataPreviewProps {
  data: ChartCoordinate[];
  options: ScatterChartOptions;
  predictions: any[];
}

export const DataPreview = ({
  data,
  options,
  predictions,
}: DataPreviewProps) => {
  const { name, yLabel, xLabel } = options;
  const _name = name ?? `${yLabel} vs ${xLabel}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart>
        {Grid()}
        {Axes({ x: { key: "x", unit: "hp" }, y: { key: "y", unit: "mpg" } })}
        <Legend />
        <Tooltip />
        <Scatter name={_name} fill="#8884d8" data={data} />
        {predictions.length ? (
          <Line
            name={"predictions"}
            fill="#8884d8"
            data={predictions}
            dataKey={"y"}
            strokeWidth={3}
            dot={false}
          />
        ) : null}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
