import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartScatterChart,
  Tooltip,
  ResponsiveContainer,
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
    <ResponsiveContainer width="100%" height={400}>
      <RechartScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        {/* @ts-ignore */}
        <XAxis type="number" dataKey="x" name={xLabel} unit={xLabel} />
        {/* @ts-ignore */}
        <YAxis type="number" dataKey="y" name={yLabel} unit={yLabel} />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name={name} data={data} fill="#8884d8" />
      </RechartScatterChart>
    </ResponsiveContainer>
  );
};
