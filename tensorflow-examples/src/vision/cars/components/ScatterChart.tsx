import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface Coordinates {
  x: number;
  y: number;
  z: number;
}

interface ScatterChartProps {
  data: Coordinates[];
  xLabel: string;
  yLabel: string;
  name: string;
}

export const ScatterChart = ({ data, xLabel, yLabel, name }: ScatterChartProps) => {
  return (
    // @ts-ignore
      <RechartScatterChart height={500} width={500}>
        <CartesianGrid />
        {/* @ts-ignore */}
        <XAxis type="number" dataKey="x" name={xLabel} unit={xLabel} />
        {/* @ts-ignore */}
        <YAxis type="number" dataKey="y" name={yLabel} unit={yLabel} />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name={name} data={data} fill="#8884d8" />
      </RechartScatterChart>
  );
};
