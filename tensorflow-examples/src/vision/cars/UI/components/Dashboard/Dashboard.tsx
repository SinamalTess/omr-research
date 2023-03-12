import { ReactElement } from "react";
import { Grid } from "@mui/material";

interface DashboardProps {
    children: ReactElement | ReactElement[];
    className?: string;
}

export const Dashboard = ({ children, className }: DashboardProps) => {
    return (
        <Grid className={className} container spacing={2}>
            {children}
        </Grid>
    );
};
