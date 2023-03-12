import * as React from "react";
import * as tf from "@tensorflow/tfjs";
import { Chip, Typography } from "@mui/material";
import { AltRoute, ArrowUpward } from "@mui/icons-material";
import { StyledTable } from "./StyledTable";
import { ChipProps } from "@mui/material/Chip/Chip";

interface ModelSummaryProps {
  model: tf.LayersModel;
}

const BaseChip = (props: ChipProps) => <Chip size={"small"} {...props} />;

const getChip = (i: number, length: number) => {
  switch (i) {
    case 0:
      return <BaseChip label={"input"} color={"primary"} />;
    case length - 1:
      return <BaseChip label={"output"} color={"secondary"} />;
    default:
      return <BaseChip label={"hidden layer"} color={"success"} />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Functional":
      return <AltRoute />;
    default:
      return <ArrowUpward />;
  }
};

const getRow = (layer: tf.layers.Layer, i: number, model: tf.LayersModel) => {
  const type = layer.constructor.name;
  const { outputShape } = layer;
  const input = `[${layer.batchInputShape?.map((shape) => `${shape}`)}]`;
  const output = `[${outputShape.map((shape) => `${shape}`)}]`;
  const params = layer.countParams();
  // @ts-ignore
  const activationFunction = layer.activation.constructor.name ?? "";
  // @ts-ignore
  const units = layer.units ?? 0;
  const typeWithChip = (
    <>
      {type} {getChip(i, model.layers.length)}
    </>
  );
  return [typeWithChip, input, output, params, units, activationFunction];
};

export const ModelSummary = ({ model }: ModelSummaryProps) => {
  const type = model.constructor.name;

  const headings = [
    "Layer type",
    "Input Shape",
    "Output shape",
    "Params",
    "Neurons",
    "Activation Function",
  ];

  const rows = model.layers.map((layer, i) => {
    const { name } = layer;
    const row = getRow(layer, i, model);
    const rowWithCellKeys = row.map((cell, i) => ({
      key: type + i,
      content: cell,
    }));

    return {
      key: name,
      content: rowWithCellKeys,
    };
  });

  return (
    <>
      <Typography variant={"h6"} color={"primary"}>
        {getTypeIcon(type)} {type} model
      </Typography>
      <StyledTable headings={headings} rows={rows} />
    </>
  );
};
