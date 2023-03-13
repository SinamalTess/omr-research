import { Tensor2D } from "@tensorflow/tfjs";

interface normalizeDataParams {
  inputTensor: Tensor2D;
  labelTensor: Tensor2D;
}

export const normalizeData = ({
  inputTensor,
  labelTensor,
}: normalizeDataParams) => {
  // Normalize the data to the range 0 - 1 using min-max scaling
  const inputMax = inputTensor.max();
  const inputMin = inputTensor.min();
  const labelMax = labelTensor.max();
  const labelMin = labelTensor.min();

  const normalizedInputs = inputTensor
    .sub(inputMin)
    .div(inputMax.sub(inputMin));
  const normalizedLabels = labelTensor
    .sub(labelMin)
    .div(labelMax.sub(labelMin));

  return {
    normalizedInputs,
    normalizedLabels,
    inputMax,
    inputMin,
    labelMax,
    labelMin,
  };
};
