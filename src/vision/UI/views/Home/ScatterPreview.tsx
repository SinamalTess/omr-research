import {
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
} from "recharts";
import { Grid, ScatterChartOptions } from "../../components";
import { Axes } from "../../components/Visualizations/Axes";
import React from "react";
import { Coordinates } from "../../../domain";

interface ScatterPreviewProps {
  data: unknown[];
  options: ScatterChartOptions;
  predictions: Coordinates[];
}

export const ScatterPreview = ({
  data,
  options,
  predictions,
}: ScatterPreviewProps) => {
  const { name, yKey, xKey } = options;
  const _name = name ?? `${yKey} vs ${xKey}`;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart>
        {Grid()}
        {Axes({ x: { key: xKey, unit: xKey }, y: { key: yKey, unit: yKey } })}
        <Legend />
        <Tooltip />
        <Scatter name={_name} fill="#8884d8" data={data} />
        {predictions.length ? (
          <Line
            name={"predictions"}
            fill="#8884d8"
            data={predictions}
            dataKey={yKey}
            strokeWidth={3}
            dot={false}
          />
        ) : null}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
