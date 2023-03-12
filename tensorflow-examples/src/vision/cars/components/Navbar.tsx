import { Grid } from "@mui/material";
import React, { ReactElement } from "react";

interface NavbarProps {
  children: ReactElement | ReactElement[];
}

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {children}
    </Grid>
  );
};
