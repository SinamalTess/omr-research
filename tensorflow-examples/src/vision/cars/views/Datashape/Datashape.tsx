import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { Chip, Grid, styled, TextField } from "@mui/material";

interface DatashapeProps {
  originalData: any;
  filteredData: any;
  url: string;
}

const StyledDiv = styled("div")`
  & code {
    max-height: 600px;
  }
`;

export const Datashape = ({
  originalData,
  filteredData,
  url,
}: DatashapeProps) => {
  const originalJSON = JSON.stringify(originalData, null, 2);
  const filteredJSON = JSON.stringify(filteredData, null, 2);
  const nbOriginalEntries = originalData.length;
  const nbFilteredEntries = filteredData.length;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField size="small" fullWidth disabled value={url}></TextField>
      </Grid>
      <Grid item xs={4}>
        <StyledDiv>
          <Chip label={`${nbOriginalEntries} original entries`} />
          <CodeBlock
            text={originalJSON}
            language={"json"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={dracula}
          />
        </StyledDiv>
      </Grid>
      <Grid item xs={4}>
        <StyledDiv>
          <Chip label={`${nbFilteredEntries} filtered entries`} />
          <CodeBlock
            text={filteredJSON}
            language={"json"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={dracula}
          />
        </StyledDiv>
      </Grid>
      <Grid item xs={4}>
        <StyledDiv></StyledDiv>
      </Grid>
    </Grid>
  );
};
