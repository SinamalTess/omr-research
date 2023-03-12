import { Object } from "../Object";

export const isObject = (item: any): item is Object =>
  typeof item === "object" && item !== null;
