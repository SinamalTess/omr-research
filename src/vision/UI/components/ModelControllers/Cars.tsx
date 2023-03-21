import { useEffect, useState } from "react";
import { getModel, getModelParams, startTraining } from "../../../model/cars";
import { useData } from "../../hooks";
import { Car } from "../../../domain";
import { dataToCoordinates, filterCarsData } from "../../../adapters";
import { AxesKeys } from "../../../types";
import { TrainingStatus } from "../../../../App";
import { ModelController } from "../../../domain/modelController.entity";

const URL = "https://storage.googleapis.com/tfjs-tutorials/carsData.json";
const TITLE = "Horsepower vs MPG (miles per gallon)";

export const Cars = ({
  epochs,
  trainingStatus,
  onEpochEnd,
  onTrainingEnd,
  onOriginalDataChange,
  onDataUrlChange,
  onDataChange,
  onModelChange,
  onAxesKeysChange,
  onModelParamsChange,
  onTitleChange,
}: ModelController) => {
  const [originalData] = useData<Car[]>(URL, []);
  const [model, setModel] = useState(getModel());
  const data = filterCarsData(originalData);
  const axesKeys: AxesKeys = ["horsepower", "mpg"];

  useEffect(() => {
    if (trainingStatus === "training") {
      setModel(getModel());
      const { modelParams } = getModelParams(data, epochs, axesKeys);
      onModelChange(model);

      startTraining(model, data, {
        modelParams,
        axesKeys,
        onEpochEnd: onEpochEnd,
        onTrainingEnd: onTrainingEnd,
      });
    }
  }, [trainingStatus]);

  useEffect(() => {
    onDataUrlChange?.(URL);
    onModelChange(model);
    onTitleChange?.(TITLE);
    onAxesKeysChange?.(axesKeys);
  }, []);

  useEffect(() => {
    if (originalData.length > 0 && epochs) {
      const { modelParams } = getModelParams(data, epochs, axesKeys);

      onOriginalDataChange(originalData);
      onDataChange(data);
      onModelParamsChange(modelParams);
      onModelChange(model);
    }
  }, [originalData, epochs]);

  return null;
};
