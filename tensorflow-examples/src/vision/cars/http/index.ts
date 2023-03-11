import { Car, NormalizedCar } from "../domain";

export async function getData() {
  const carsDataResponse = await fetch(
    "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
  );
  const carsData = await carsDataResponse.json();
  const normalizedData = carsData
    .map((car: Car) => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter((car: NormalizedCar) => car.mpg != null && car.horsepower != null);

  return normalizedData;
}
