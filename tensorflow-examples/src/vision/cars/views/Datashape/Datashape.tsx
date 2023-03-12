import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { Grid, styled, Typography } from "@mui/material";

interface DatashapeProps {
  originalData: any;
  filteredData: any;
}

const StyledDiv = styled("div")`
  & code {
    max-height: 600px;
  }
`;

export const Datashape = ({ originalData, filteredData }: DatashapeProps) => {
  const originalJSON = JSON.stringify(originalData, null, 2);
  const filteredJSON = JSON.stringify(filteredData, null, 2);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <StyledDiv>
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
        <StyledDiv>

        </StyledDiv>
      </Grid>
    </Grid>
  );
};
