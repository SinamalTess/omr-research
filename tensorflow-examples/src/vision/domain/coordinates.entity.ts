import { isObject } from "../types/utils";

export interface Coordinates {
  x: number;
  y: number;
}

export const isCoordinates = (item: unknown): item is Coordinates =>
  isObject(item) &&
  "x" in item &&
  "y" in item &&
  typeof item.x === "number" &&
  typeof item.y === "number";
