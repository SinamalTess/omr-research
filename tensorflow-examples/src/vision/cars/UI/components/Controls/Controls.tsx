import { TrainButton } from "./TrainButton";
import { Grid } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { EpochsInput } from "./EpochsInput";
import { ProgressBar } from "./ProgressBar";

interface ControlsProps {
  isTraining: boolean;
  currentEpoch: number;
  epochs: number;
  onClick: () => void;
  onChangeEpochs: (epochs: number) => void;
  onEnterKeyDown: () => void;
}

export const Controls = ({
  isTraining,
  currentEpoch,
  epochs,
  onClick,
  onChangeEpochs,
  onEnterKeyDown,
}: ControlsProps) => {
  return (
    <Grid display={"flex"} justifyItems={"space-between"} alignItems={"center"}>
      <ProgressBar epochs={epochs} currentEpoch={currentEpoch} />
      <EpochsInput
        epochs={epochs}
        currentEpoch={currentEpoch}
        onChange={onChangeEpochs}
        onEnterKeyDown={onEnterKeyDown}
      />
      <TrainButton isLoading={isTraining} onClick={onClick} />
    </Grid>
  );
};
