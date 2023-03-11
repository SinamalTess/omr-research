import { NormalizedCar } from "../domain";
import { ChartCoordinate } from "recharts/types/util/types";

export const dataToChartData = (data: NormalizedCar[]): ChartCoordinate[] =>
  data.map(({ horsepower, mpg }) => ({
    x: horsepower,
    y: mpg,
    z: 10,
  }));
