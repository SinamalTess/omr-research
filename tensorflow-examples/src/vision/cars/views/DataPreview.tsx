import { ScatterChartOptions } from "../components/ScatterChart";
import React from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCoordinate } from "recharts/types/util/types";

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
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name={xLabel} unit={xLabel} />
          <YAxis type="number" dataKey="y" name={yLabel} unit={yLabel} />
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
