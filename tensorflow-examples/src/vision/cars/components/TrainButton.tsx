import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import React, { MouseEventHandler } from "react";

interface TrainButtonProps {
  isLoading: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const TrainButton = ({ isLoading, onClick }: TrainButtonProps) => {
  return (
    <LoadingButton
      loading={isLoading}
      onClick={onClick}
      startIcon={<PlayArrow />}
      loadingPosition="start"
    >
      {isLoading ? "Training..." : "Train model" }
    </LoadingButton>
  );
};
