import React from "react";
import { LinearProgress, styled } from "@mui/material";

const StyledProgressBar = styled(LinearProgress)`
  width: 100px;
  margin: 0 ${({ theme }) => theme.spacing(2)};
`;

interface ProgressBarProps {
  currentEpoch: number;
  epochs: number;
}

export const ProgressBar = ({ currentEpoch, epochs }: ProgressBarProps) => {
  const progress = (100 * currentEpoch) / epochs;
  return <StyledProgressBar value={progress} variant="determinate" />;
};
