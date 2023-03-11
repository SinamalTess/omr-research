import { NormalizedCar } from "../domain";

export function dataToChartData(data: NormalizedCar[]) {
  return data.map(({ horsepower, mpg }) => ({
    x: horsepower,
    y: mpg,
    z: 10,
  }));
}
