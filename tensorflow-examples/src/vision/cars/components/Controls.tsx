import { TrainButton } from "./TrainButton";
import {
  Grid,
  InputAdornment,
  LinearProgress,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, MouseEventHandler } from "react";

interface ControlsProps {
  isTraining: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChangeEpochs: (epochs: number) => void;
  currentEpoch: number;
  epochs: number;
}

const StyledProgressBar = styled(LinearProgress)`
  width: 100px;
  margin: 0 ${({ theme }) => theme.spacing(2)};
`;

export const Controls = ({
  isTraining,
  currentEpoch,
  epochs,
  onClick,
  onChangeEpochs,
}: ControlsProps) => {
  const progress = (100 * currentEpoch) / epochs;

  const handleEpochsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    const { value } = event.target;
    const isNumber = regex.test(value);
    const maxValue = 150

    if ((value === "" || isNumber) && +value <= maxValue) {
      onChangeEpochs(+value);
    }
  };
  return (
    <Grid display={"flex"} justifyItems={"space-between"} alignItems={"center"}>
      <StyledProgressBar value={progress} variant="determinate" />
      <Typography color={"textSecondary"}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {`${currentEpoch} / `}
              </InputAdornment>
            ),
          }}
          value={epochs}
          size="small"
          onChange={handleEpochsChange}
        />
      </Typography>
      <TrainButton isLoading={isTraining} onClick={onClick} />
    </Grid>
  );
};
