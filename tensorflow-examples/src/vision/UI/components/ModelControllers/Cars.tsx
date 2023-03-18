import {useEffect, useState} from "react";
import { getModel, getModelParams, startTraining } from "../../../model/cars";
import { useData } from "../../hooks";
import { Car } from "../../../domain";
import { dataToCoordinates, filterCarsData } from "../../../adapters";
import { AxesKeys } from "../../../types";
import { TrainingStatus } from "../../../../App";

interface CarsProps {
  epochs: number;
  trainingStatus: TrainingStatus;
  onEpochEnd: Function;
  onTrainingEnd: Function;
  onOriginalDataChange: Function;
  onDataChange: Function;
  onDataUrlChange: Function;
  onModelChange: Function;
  onAxesKeysChange: Function;
  onChartDataChange: Function;
  onModelParamsChange: Function;
}

const URL = "https://storage.googleapis.com/tfjs-tutorials/carsData.json";

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
  onChartDataChange,
  onModelParamsChange,
}: CarsProps) => {
  const [originalData] = useData<Car[]>(URL, []);
  const [model, setModel] = useState(getModel());
  const data = filterCarsData(originalData);
  const axesKeys: AxesKeys = ["horsepower", "mpg"];
  const chartData = dataToCoordinates(data, axesKeys[0], axesKeys[1]);

  useEffect(() => {
    if (trainingStatus === 'training') {
      setModel(getModel())
      const { modelParams } = getModelParams(data, epochs, axesKeys);
      onModelChange(model)

      startTraining(model, data, {
        modelParams,
        axesKeys,
        onEpochEnd: onEpochEnd,
        onTrainingEnd: onTrainingEnd,
      });
    }
  }, [trainingStatus]);

  useEffect(() => {
    onDataUrlChange(URL);
    onModelChange(model);
    onAxesKeysChange(axesKeys);
  }, []);

  useEffect(() => {
    if (originalData.length > 0 && epochs) {
      const { modelParams } = getModelParams(data, epochs, axesKeys);

      onOriginalDataChange(originalData);
      onDataChange(data);
      onChartDataChange(chartData);
      onModelParamsChange(modelParams);
      onModelChange(model);
    }
  }, [originalData, epochs]);

  return null;
};
