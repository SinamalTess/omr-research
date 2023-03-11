import { ReactElement } from "react";
import { Grid } from "@mui/material";

interface DashboardProps {
  children: ReactElement | ReactElement[];
}

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};
