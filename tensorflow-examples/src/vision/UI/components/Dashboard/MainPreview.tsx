import { Grid } from "@mui/material";
import React, { ReactElement } from "react";

interface MainPreviewProps {
    children: ReactElement | ReactElement[];
}

export const MainPreview = ({ children }: MainPreviewProps) => {
  return (
    <Grid container item xs={8}>
      {children}
    </Grid>
  );
};
