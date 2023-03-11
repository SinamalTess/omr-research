import {ScatterChart, ScatterChartOptions} from "../components/ScatterChart";
import React from "react";

interface DataPreviewProps {
  data: any[];
  options: ScatterChartOptions;
}

export const DataPreview = ({ data, options }: DataPreviewProps) => {
  return <ScatterChart data={data} options={options} />;
};
