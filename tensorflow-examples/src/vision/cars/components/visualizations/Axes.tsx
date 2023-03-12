import { XAxis, YAxis } from "recharts";
import React from "react";
import { useTheme } from "@mui/material";

interface axeOptions {
  key: string;
  unit?: string;
  type?: "number" | "category" | undefined;
}

interface AxesProps {
  x: axeOptions;
  y: axeOptions;
}

export const Axes = ({ x, y }: AxesProps) => {
  const theme = useTheme();
  const colorAxes = theme.palette.grey[500];
  return (
    <>
      <XAxis dataKey={x.key} stroke={colorAxes} unit={x.unit} type={x.type ?? "number"} />
      <YAxis dataKey={y.key} stroke={colorAxes} unit={y.unit} type={y.type ?? "number"} />
    </>
  );
};
