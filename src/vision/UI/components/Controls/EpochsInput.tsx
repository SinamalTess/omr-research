import { InputAdornment, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent } from "react";

interface EpochsInputProps {
  onChange: (newEpochsValue: number) => void;
  onEnterKeyDown: () => void;
  epochs: number;
  currentEpoch: number;
}

export const EpochsInput = ({
  currentEpoch,
  epochs,
  onChange,
  onEnterKeyDown,
}: EpochsInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    const { value } = event.target;
    const isNumber = regex.test(value);
    const maxValue = 150;

    if ((value === "" || isNumber) && +value <= maxValue) {
      onChange(+value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnterKeyDown();
    }
  };

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{`${currentEpoch} / `}</InputAdornment>
        ),
      }}
      value={epochs}
      size="small"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
