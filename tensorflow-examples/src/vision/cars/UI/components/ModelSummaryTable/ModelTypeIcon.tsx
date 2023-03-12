import React from "react";
import { AltRoute, ArrowUpward } from "@mui/icons-material";

export const ModelTypeIcon = (type: string) => {
  switch (type) {
    case "Functional":
      return <AltRoute />;
    default:
      return <ArrowUpward />;
  }
};
