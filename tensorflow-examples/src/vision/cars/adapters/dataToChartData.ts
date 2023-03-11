import { NormalizedCar } from "../domain";

export const dataToChartData = (data: NormalizedCar[]) =>
  data.map(({ horsepower, mpg }) => ({
    x: horsepower,
    y: mpg,
    z: 10,
  }));
