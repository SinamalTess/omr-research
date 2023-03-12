import { NormalizedCar } from "../domain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCarsData } from "../data/cars.service";

export const useData = (): [
  NormalizedCar[],
  Dispatch<SetStateAction<NormalizedCar[]>>
] => {
  const [data, setData] = useState<NormalizedCar[]>([]);

  useEffect(() => {
    getCarsData().then((response) => setData(response));
  }, [setData]);

  return [data, setData];
};
