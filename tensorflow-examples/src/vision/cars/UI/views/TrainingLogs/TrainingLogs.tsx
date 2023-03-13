import { Grid, Typography, useTheme } from "@mui/material";
import { StyledTable } from "../../components/StyledTable";
import { TrainingData } from "../../../../types";

const HEADINGS = ["Iteration", "Loss", "Compared to previous", "Model"];

interface TrainingLogsProps {
  trainingLogs: TrainingData[];
}

export const TrainingLogs = ({ trainingLogs }: TrainingLogsProps) => {
  const theme = useTheme();
  const rows = trainingLogs.map((log, i) => {
    const { loss } = log;
    const comparisonPrevious = loss - trainingLogs[Math.max(i - 1, 0)].loss;
    const isPositiveDifference = comparisonPrevious > 0;
    const color = isPositiveDifference
      ? theme.palette.primary.main
      : theme.palette.grey[700];
    const ComparisonPrevious = () => (
      <span style={{ color: `${color}` }}>{comparisonPrevious}</span>
    );
    return {
      key: `${i}`,
      content: [
        { key: `${i}-iteration`, content: <>{i + 1}</> },
        { key: `${i}-loss`, content: <>{loss}</> },
        { key: `${i}-previous`, content: <ComparisonPrevious /> },
      ],
    };
  });

  return <StyledTable headings={HEADINGS} rows={rows} />;
};
