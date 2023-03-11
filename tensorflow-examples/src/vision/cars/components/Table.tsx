import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as tf from "@tensorflow/tfjs";

interface ModelSummaryProps {
  model: tf.LayersModel;
}

export const ModelSummary = ({ model }: ModelSummaryProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Layer type</TableCell>
            <TableCell>Input Shape</TableCell>
            <TableCell>Output shape</TableCell>
            <TableCell>Params</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {model.layers.map((layer) => (
            <TableRow
              key={layer.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {layer.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {`[${layer.batchInputShape?.map((shape) => `${shape}`)}]`}
              </TableCell>
              <TableCell component="th" scope="row">
                {`[${layer.outputShape.map((shape) => `${shape}`)}]`}
              </TableCell>
              <TableCell component="th" scope="row">
                {layer.countParams()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
