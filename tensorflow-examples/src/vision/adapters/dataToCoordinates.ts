import { Coordinates } from "../domain";
import { isObject } from "../types/utils";

export const dataToCoordinates = (
  data: unknown[],
  xKey: string,
  yKey: string
): Coordinates[] => {
  let coordinates: Coordinates[] = [];
  try {
    coordinates = data.map((item) => {
      if (isObject(item) && xKey in item && yKey in item) {
        return {
          x: item[xKey],
          y: item[yKey],
        } as Coordinates;
      } else {
        throw new Error(
          `Failed to turn data to coordinates: item ${JSON.stringify(
            item
          )} is not an object or is missing key "${xKey}" or "${yKey}"`
        );
      }
    });
  } catch (e: any) {
    throw e;
  }
  return coordinates;
};
