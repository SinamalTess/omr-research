import { TrainButton } from "./TrainButton";
import { Grid, LinearProgress, styled } from "@mui/material";
import React, { MouseEventHandler } from "react";

interface ControlsProps {
  isTraining: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  progress: number;
  totalEpoch: number;
}

const StyledProgressBar = styled(LinearProgress)`
  width: 100px;
  margin: 0 15px;
`;

export const Controls = ({
  isTraining,
  progress,
  totalEpoch,
  onClick,
}: ControlsProps) => {
  return (
    <Grid display={"flex"} justifyItems={"space-between"} alignItems={"center"}>
      <StyledProgressBar value={progress} variant="determinate" />
      {totalEpoch}
      <TrainButton isLoading={isTraining} onClick={onClick} />
    </Grid>
  );
};
