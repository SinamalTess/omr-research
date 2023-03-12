import { TrainButton } from "./TrainButton";
import { Grid } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { EpochsInput } from "./EpochsInput";
import { ProgressBar } from "./ProgressBar";

interface ControlsProps {
  isTraining: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChangeEpochs: (epochs: number) => void;
  currentEpoch: number;
  epochs: number;
}

export const Controls = ({
  isTraining,
  currentEpoch,
  epochs,
  onClick,
  onChangeEpochs,
}: ControlsProps) => {
  return (
    <Grid display={"flex"} justifyItems={"space-between"} alignItems={"center"}>
      <ProgressBar epochs={epochs} currentEpoch={currentEpoch} />
      <EpochsInput
        epochs={epochs}
        currentEpoch={currentEpoch}
        onChange={onChangeEpochs}
      />
      <TrainButton isLoading={isTraining} onClick={onClick} />
    </Grid>
  );
};
