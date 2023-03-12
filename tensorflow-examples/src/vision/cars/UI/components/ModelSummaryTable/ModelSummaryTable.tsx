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
  "Layer type",
  "Input Shape",
  "Output shape",
  "Params",
  "Neurons",
  "Activation Function",
];

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
      {type} {ChipLayerPosition(i, model.layers.length)}
    </>
  );
  return [typeWithChip, input, output, params, units, activationFunction];
};

export const ModelSummaryTable = ({ model }: ModelSummaryProps) => {
  const type = model.constructor.name;

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
        {ModelTypeIcon(type)} {type} model
      </Typography>
      <StyledTable headings={HEADINGS} rows={rows} />
    </>
  );
};
