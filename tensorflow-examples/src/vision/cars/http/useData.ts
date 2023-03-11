import { getData } from "./index";
import { NormalizedCar } from "../domain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useData = (): [
  NormalizedCar[],
  Dispatch<SetStateAction<NormalizedCar[]>>
] => {
  const [data, setData] = useState<NormalizedCar[]>([]);

  useEffect(() => {
    getData().then((response) => setData(response));
  }, [setData]);

  return [data, setData];
};
