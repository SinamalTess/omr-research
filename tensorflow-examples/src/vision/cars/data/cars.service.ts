import { Car, NormalizedCar } from "../domain";
import { fetchData } from "../http";
import { filterData } from "../adapters/filterData";

export const getCarsData = async (): Promise<NormalizedCar[]> => {
  const url = "https://storage.googleapis.com/tfjs-tutorials/carsData.json";
  const carsData = await fetchData<Car[]>(url);

  return filterData(carsData);
};
