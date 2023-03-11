import { getData } from "../http";
import * as tfvis from "@tensorflow/tfjs-vis";
import { NormalizedCar } from "../domain";
import { useEffect } from "react";

async function plotChart() {
  const data = await getData();
  const values = data.map(({ horsepower, mpg }: NormalizedCar) => ({
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

export function useChart() {
  useEffect(() => {
    plotChart().then();
  }, []);
}
