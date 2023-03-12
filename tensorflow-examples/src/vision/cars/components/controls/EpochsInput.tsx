import {InputAdornment, TextField, Typography} from "@mui/material";
import React, { ChangeEvent } from "react";

interface EpochsInputProps {
  onChange: (newEpochsValue: number) => void;
  epochs: number;
  currentEpoch: number;
}

export const EpochsInput = ({
  currentEpoch,
  epochs,
  onChange,
}: EpochsInputProps) => {
  const handleEpochsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    const { value } = event.target;
    const isNumber = regex.test(value);
    const maxValue = 150;

    if ((value === "" || isNumber) && +value <= maxValue) {
      onChange(+value);
    }
  };

  return (
    <Typography color={"textSecondary"}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{`${currentEpoch} / `}</InputAdornment>
          ),
        }}
        value={epochs}
        size="small"
        onChange={handleEpochsChange}
      />
    </Typography>
  );
};
