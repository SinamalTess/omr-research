import { Car } from "../domain";
import { fetchData } from "../http";

export const getCarsData = async (): Promise<Car[]> => {
  const url = "https://storage.googleapis.com/tfjs-tutorials/carsData.json";

  return await fetchData<Car[]>(url);
};
