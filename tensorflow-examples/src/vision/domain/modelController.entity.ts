import { TrainingStatus } from "../../App";
import { Sequential } from "@tensorflow/tfjs";
import { AxesKeys, EvaluationData } from "../types";
import { Coordinates } from "./coordinates.entity";
import { TrainingData } from "./trainingData.entity";
import { ModelParams } from "../model/cars";

export interface ModelController {
  epochs: number;
  trainingStatus: TrainingStatus;
  onEpochEnd: (trainingData: TrainingData) => void;
  onTrainingEnd: (evaluationData: EvaluationData, finalLoss: number) => void;
  onOriginalDataChange: (data: unknown[]) => void;
  onDataChange: (data: unknown[]) => void;
  onDataUrlChange?: (url: string) => void;
  onModelChange: (model: Sequential) => void;
  onAxesKeysChange?: (axesKeys: AxesKeys) => void;
  onChartDataChange?: (coordinates: Coordinates[]) => void;
  onModelParamsChange: (modelParams: ModelParams) => void;
  onTitleChange?: (title: string) => void;
}
