import { Car } from "../domain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCarsData } from "../data/cars.service";

export const useData = (): [Car[], Dispatch<SetStateAction<Car[]>>] => {
  const [data, setData] = useState<Car[]>([]);

  useEffect(() => {
    getCarsData().then((response) => setData(response));
  }, [setData]);

  return [data, setData];
};
