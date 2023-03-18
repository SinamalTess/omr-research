import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { Chip, Grid, styled, TextField } from "@mui/material";
import { Tensors } from "../../../model/cars";

interface DatashapeProps {
  originalData: unknown[];
  filteredData: unknown[];
  tensors?: Tensors | null;
  url?: string;
}

const StyledDiv = styled("div")`
  & code {
    max-height: 600px;
  }
`;

const BaseCodeBlock = ({ code }: { code: string }) => (
  <CodeBlock
    text={code}
    language={"json"}
    showLineNumbers={true}
    startingLineNumber={1}
    theme={dracula}
  />
);

const codify = (input: unknown) => JSON.stringify(input, null, 2);

export const Datashape = ({
  originalData,
  filteredData,
  url,
  tensors,
}: DatashapeProps) => {
  const maxEntries = 2;
  const originalJSON = codify(originalData.slice(0, maxEntries));
  const filteredJSON = codify(filteredData.slice(0, maxEntries));
  const tensorsInputs = tensors ? tensors.normalizedInputs.dataSync() : [];
  const tensorsInputsJSON = tensors
    ? codify(tensorsInputs.slice(0, maxEntries))
    : "";
  const tensorsLabels = tensors ? tensors.normalizedLabels.dataSync() : [];
  const tensorsLabelsJSON = tensors
    ? codify(tensorsLabels.slice(0, maxEntries))
    : "";

  return (
    <Grid container spacing={2}>
      {url ? (
        <Grid item xs={12}>
          <TextField size="small" fullWidth disabled value={url}></TextField>
        </Grid>
      ) : null}
      <Grid item xs={4}>
        <StyledDiv>
          <Chip label={`${originalData.length} original entries`} />
          <BaseCodeBlock code={originalJSON} />
        </StyledDiv>
      </Grid>
      <Grid item xs={4}>
        <StyledDiv>
          <Chip label={`${filteredData.length} filtered entries`} />
          <BaseCodeBlock code={filteredJSON} />
        </StyledDiv>
      </Grid>
      {tensors ? (
        <>
          <Grid item xs={4}>
            <StyledDiv>
              <Chip label={`${tensorsInputs.length} tensor inputs`} />
              <BaseCodeBlock code={tensorsInputsJSON} />
            </StyledDiv>
            <StyledDiv>
              <Chip label={`${tensorsLabels.length} tensor labels`} />
              <BaseCodeBlock code={tensorsLabelsJSON} />
            </StyledDiv>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};
