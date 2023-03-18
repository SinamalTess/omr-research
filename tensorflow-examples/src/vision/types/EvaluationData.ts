import { Coordinates, isCoordinates } from "../domain";
import { isArray, isNumber } from "./utils";

type Evaluation2DCoordinatesData = [
  predictions: Coordinates[],
  labels: Coordinates[]
];

export type Evaluation2DData = [predictions: number[], labels: number[]];

export type EvaluationData = Evaluation2DCoordinatesData | Evaluation2DData;

export const isEvaluation2DCoordinatesData = (
  items: unknown[]
): items is Evaluation2DCoordinatesData =>
  items.every((item) => isCoordinates(item));

export const isEvaluation2DData = (items: unknown): items is Evaluation2DData =>
  isArray(items) &&
  items.length === 2 &&
  isArray(items[0]) &&
  isArray(items[1]) &&
  items[0].every((item) => isNumber(item)) &&
  items[1].every((item) => isNumber(item));
