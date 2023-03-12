import { Grid } from "@mui/material";
import React, { ReactElement } from "react";

interface SidebarProps {
  children: ReactElement | ReactElement[];
}

export const Sidebar = ({ children }: SidebarProps) => {
  const _children = Array.isArray(children) ? children : [children];

  return (
    <Grid container item xs={4} spacing={2}>
      {_children.map((children) => (
        <Grid item xs={12}>
          {children}
        </Grid>
      ))}
    </Grid>
  );
};
