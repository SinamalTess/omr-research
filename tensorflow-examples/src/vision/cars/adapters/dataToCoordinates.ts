import { NormalizedCar, Coordinates } from "../domain";

export const dataToCoordinates = (data: NormalizedCar[]): Coordinates[] =>
  data.map(({ horsepower, mpg }) => ({
    x: horsepower,
    y: mpg,
  }));
