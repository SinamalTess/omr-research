import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as tf from "@tensorflow/tfjs";
import { Chip, Typography } from "@mui/material";
import { AltRoute, ArrowUpward } from "@mui/icons-material";

interface ModelSummaryProps {
  model: tf.LayersModel;
}

const getChip = (i: number, length: number) => {
  if (i === 0) {
    return <Chip size={"small"} label={"input"} color={"primary"} />;
  } else if (i === length - 1) {
    return <Chip size={"small"} label={"output"} color={"secondary"} />;
  }
  return <Chip size={"small"} label={"hidden layer"} color={"success"} />;
};

const getTypeIcon = (type: string) => {
  if (type === "Functional") {
    return <AltRoute />;
  } else {
    return <ArrowUpward />;
  }
};

export const ModelSummary = ({ model }: ModelSummaryProps) => {
  const type = model.constructor.name;

  const heads = [
    "Layer type",
    "Input Shape",
    "Output shape",
    "Params",
    "Neurons",
  ];

  const layers = model.layers.map((layer) => {
    const type = layer.constructor.name;
    const { name, outputShape } = layer;
    const input = `[${layer.batchInputShape?.map((shape) => `${shape}`)}]`;
    const output = `[${outputShape.map((shape) => `${shape}`)}]`;
    const params = layer.countParams();
    // @ts-ignore
    const units = layer.units ?? 0;

    return { type, input, output, params, units, name };
  });

  return (
    <>
      <Typography variant={"h6"} color={"primary"}>
        {getTypeIcon(type)} {type} model
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              {heads.map((head) => (
                <TableCell>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {layers.map((layer, i) => {
              const { input, type, output, params, name, units } = layer;
              return (
                <TableRow
                  key={name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {type} {getChip(i, model.layers.length)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {input}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {output}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {params}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {units}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
