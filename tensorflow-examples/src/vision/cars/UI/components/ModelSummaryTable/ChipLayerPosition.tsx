import {ChipProps} from "@mui/material/Chip/Chip";
import {Chip} from "@mui/material";
import * as React from "react";

const BaseChip = (props: ChipProps) => <Chip size={"small"} {...props} />;

export const ChipLayerPosition = (i: number, length: number) => {
    switch (i) {
        case 0:
            return <BaseChip label={"input"} color={"primary"} />;
        case length - 1:
            return <BaseChip label={"output"} color={"secondary"} />;
        default:
            return <BaseChip label={"hidden layer"} color={"success"} />;
    }
};
