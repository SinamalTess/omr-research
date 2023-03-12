import {Car, NormalizedCar} from "../domain";

export const filterData = (data: Car[]): NormalizedCar[] => {
    return data
        .map((car: Car) => ({
            mpg: car.Miles_per_Gallon,
            horsepower: car.Horsepower,
        }))
        .filter((car: NormalizedCar) => car.mpg != null && car.horsepower != null);
};
