import { Chip, Grid, useTheme } from "@mui/material";
import { StyledTable } from "../../components/StyledTable";

const HEADINGS = ["Iteration", "Loss", "Compared to previous", "Model"];

interface TrainingLogsProps {
  trainingLogs: number[];
}

export const TrainingLogs = ({ trainingLogs }: TrainingLogsProps) => {
  const theme = useTheme();
  const rows = trainingLogs.map((loss, i) => {
    const comparisonPrevious = loss - trainingLogs[Math.max(i - 1, 0)];
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

  const roundValue = 4;
  const average = trainingLogs.reduce((p, c) => p + c, 0) / trainingLogs.length;
  const averageRounded = average.toFixed(roundValue);
  const best = Math.min(...trainingLogs);
  const bestRounded = best.toFixed(roundValue);

  return (
    <Grid container>
      <Grid item xs={8}>
        <StyledTable headings={HEADINGS} rows={rows} />
      </Grid>
      {trainingLogs.length ? (
        <Grid item xs={4}>
          <Chip label={`Average: ${averageRounded}`}></Chip>
          <Chip label={`Best: ${bestRounded}`}></Chip>
        </Grid>
      ) : null}
    </Grid>
  );
};
