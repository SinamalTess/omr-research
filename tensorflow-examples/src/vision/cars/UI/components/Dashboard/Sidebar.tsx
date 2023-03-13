import { Grid } from "@mui/material";
import React, { ReactElement } from "react";

interface SidebarProps {
  children: ReactElement | ReactElement[];
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Grid container item xs={4} spacing={2}>
      {React.Children.map(children, (child) => (
        <Grid item xs={12}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};
