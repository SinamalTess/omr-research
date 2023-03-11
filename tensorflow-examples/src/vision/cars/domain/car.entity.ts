export interface Car {
  Name: string;
  Miles_per_Gallon: number;
  Cylinders: number;
  Displacement: number;
  Horsepower: number;
  Weight_in_lbs: number;
  Acceleration: number;
  Year: string;
  Origin: string;
}

export type NormalizedCar = Omit<Car, "Miles_per_Gallon" | "Horsepower"> & {
  mpg: number;
  horsepower: number;
};
