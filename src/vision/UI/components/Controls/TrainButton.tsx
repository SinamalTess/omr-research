import LoadingButton from "@mui/lab/LoadingButton";
import PlayArrow from "@mui/icons-material/PlayArrow";
import React from "react";

interface TrainButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export const TrainButton = ({ isLoading, onClick }: TrainButtonProps) => {
  return (
    <LoadingButton
      loading={isLoading}
      onClick={onClick}
      startIcon={<PlayArrow />}
      loadingPosition="start"
    >
      {isLoading ? "Training..." : "Train model"}
    </LoadingButton>
  );
};
