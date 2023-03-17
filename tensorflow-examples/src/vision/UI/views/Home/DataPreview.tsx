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
import { Coordinates } from "../../../domain";

interface DataPreviewProps {
  data: ChartCoordinate[];
  options: ScatterChartOptions;
  predictions: Coordinates[];
}

export const DataPreview = ({
  data,
  options,
  predictions,
}: DataPreviewProps) => {
  const { name, yKey, xKey } = options;
  const _name = name ?? `${yKey} vs ${xKey}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart>
        {Grid()}
        {Axes({ x: { key: "x", unit: xKey }, y: { key: "y", unit: yKey } })}
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
