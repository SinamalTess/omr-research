export interface Car {
  Name: "chevrolet chevelle malibu";
  Miles_per_Gallon: 18;
  Cylinders: 8;
  Displacement: 307;
  Horsepower: 130;
  Weight_in_lbs: 3504;
  Acceleration: 12;
  Year: "1970-01-01";
  Origin: "USA";
}

export type NormalizedCar = Omit<Car, "Miles_per_Gallon" | "Horsepower"> & {
  mpg: number;
  horsepower: number;
};
