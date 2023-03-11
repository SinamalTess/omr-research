import { getData } from "../http";
import * as tfvis from "@tensorflow/tfjs-vis";
import { NormalizedCar } from "../domain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

async function plotChart(data: NormalizedCar[]) {
  const values = data.map(({ horsepower, mpg }) => ({
    x: horsepower,
    y: mpg,
  }));

  await tfvis.render.scatterplot(
    { name: "Horsepower v MPG" },
    { values },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300,
    }
  );
}

export function useData(): [
  NormalizedCar[],
  Dispatch<SetStateAction<NormalizedCar[]>>
] {
  const [data, setData] = useState<NormalizedCar[]>([]);

  useEffect(() => {
    getData().then((response) => setData(response));
  }, [setData]);

  return [data, setData];
}

export function useChart(data: NormalizedCar[]) {
  useEffect(() => {
    if (!data.length) return;
    plotChart(data);
  }, [data]);
}
