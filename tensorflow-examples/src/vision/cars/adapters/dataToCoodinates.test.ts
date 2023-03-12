import { dataToCoordinates } from "./dataToCoordinates";

describe(`${dataToCoordinates.name}()`, () => {
  it("should turn data to coordinates when the 'x' and 'y' keys are found", () => {
    const data = [{ firstKey: 0, otherKey: 1 }];
    const result = dataToCoordinates(data, "firstKey", "otherKey");
    const expected = [{ x: 0, y: 1 }];

    expect(result).toStrictEqual(expected);
  });

  it("should fail if 'x', 'y' keys are NOT found", () => {
    const data = [{ firstKey: 0, otherKey: 1 }];

    expect(() => {
      dataToCoordinates(data, "misspelledKey", "otherKey");
    }).toThrow();
  });
});
