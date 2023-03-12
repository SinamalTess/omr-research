import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { Chip, Grid, styled, TextField } from "@mui/material";
import { Tensors } from "../../model";

interface DatashapeProps {
  originalData: any[];
  filteredData: any[];
  tensors?: Tensors;
  url: string;
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

const codify = (input: any) => JSON.stringify(input, null, 2);

export const Datashape = ({
  originalData,
  filteredData,
  url,
  tensors,
}: DatashapeProps) => {
  const maxEntries = 2;
  const originalJSON = codify(originalData.slice(0, maxEntries));
  const filteredJSON = codify(filteredData.slice(0, maxEntries));
  const nbOriginalEntries = originalData.length;
  const nbFilteredEntries = filteredData.length;
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
      <Grid item xs={12}>
        <TextField size="small" fullWidth disabled value={url}></TextField>
      </Grid>
      <Grid item xs={4}>
        <StyledDiv>
          <Chip label={`${nbOriginalEntries} original entries`} />
          <BaseCodeBlock code={originalJSON} />
        </StyledDiv>
      </Grid>
      <Grid item xs={4}>
        <StyledDiv>
          <Chip label={`${nbFilteredEntries} filtered entries`} />
          <BaseCodeBlock code={filteredJSON} />
        </StyledDiv>
      </Grid>
      <Grid item xs={4}>
        <StyledDiv>
          <Chip label={`${nbOriginalEntries} tensor inputs`} />
          <BaseCodeBlock code={tensorsInputsJSON} />
        </StyledDiv>
        <StyledDiv>
          <Chip label={`${nbOriginalEntries} tensor labels`} />
          <BaseCodeBlock code={tensorsLabelsJSON} />
        </StyledDiv>
      </Grid>
    </Grid>
  );
};
