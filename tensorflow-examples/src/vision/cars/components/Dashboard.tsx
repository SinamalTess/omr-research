import { ResponsiveContainer } from "recharts";
import { ReactElement } from "react";

interface DashboardProps {
  children: ReactElement;
}

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    // @ts-ignore
    <div width="100%" height={'100%'}>
      {children}
    </div>
  );
};
