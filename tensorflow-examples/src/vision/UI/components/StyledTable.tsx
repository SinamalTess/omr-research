import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import { ReactElement } from "react";
import Table from "@mui/material/Table";

interface Cell {
  key: string;
  content: ReactElement;
}

interface Row {
  key: string;
  content: Cell[];
}

interface TableProps {
  headings: string[];
  rows: Row[];
}

export const StyledTable = ({ headings, rows }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headings.map((heading) => (
              <TableCell key={heading}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
                key={row.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.content.map((cell) => (
                  <TableCell component="th" scope="row" key={cell.key}>
                    {cell.content}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
