import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchData } from "../../http";

export const useData = <T>(
  url: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [data, setData] = useState<T>(initialState);

  useEffect(() => {
    fetchData<T>(url).then((response) => setData(response));
  }, [setData]);

  return [data, setData];
};
