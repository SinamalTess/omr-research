import * as React from "react";
import * as tf from "@tensorflow/tfjs";
import { Typography } from "@mui/material";
import { StyledTable } from "../StyledTable";
import { ModelTypeIcon } from "./ModelTypeIcon";
import { ChipLayerPosition } from "./ChipLayerPosition";

interface ModelSummaryProps {
  model: tf.LayersModel;
}

const HEADINGS = [
  "Layer name",
  "Layer type",
  "Input Shape",
  "Output shape",
  "Params",
  "Neurons",
  "Activation Function",
];

const getRow = (layer: tf.layers.Layer, i: number, model: tf.LayersModel) => {
  const { outputShape, name } = layer;
  const type = layer.constructor.name;
  const input = JSON.stringify(layer.batchInputShape);
  const output = JSON.stringify(outputShape);
  const params = layer.countParams();
  // @ts-ignore
  const activationFunction = layer.activation.constructor.name ?? "";
  // @ts-ignore
  const units = layer.units ?? 0;
  const typeWithChip = (
    <>
      {type} {ChipLayerPosition(i, model.layers.length)}
    </>
  );

  const row = [name, typeWithChip, input, output, params, units, activationFunction];
  const rowWithCellKeys = row.map((cell, i) => ({
    key: type + i,
    content: cell,
  }));

  return {
    key: name,
    content: rowWithCellKeys,
  };
};

export const ModelSummaryTable = ({ model }: ModelSummaryProps) => {
  const type = model.constructor.name;
  const rows = model.layers.map((layer, i) => {
    return getRow(layer, i, model);
  });

  return (
    <>
      <Typography variant={"h6"} color={"primary"}>
        {ModelTypeIcon(type)} {type} model
      </Typography>
      <StyledTable headings={HEADINGS} rows={rows} />
    </>
  );
};
