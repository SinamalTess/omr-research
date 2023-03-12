import { CartesianGrid } from "recharts";
import React from "react";
import { useTheme } from "@mui/material";

export const Grid = () => {
  const theme = useTheme();
  const colorGrid = theme.palette.grey[700];
  return <CartesianGrid stroke={colorGrid} strokeDasharray="3" />;
};
