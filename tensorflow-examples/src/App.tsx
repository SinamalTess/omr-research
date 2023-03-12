import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Home } from "./vision/cars/views/Home";
import { styled } from "@mui/material";

const StyledHome = styled(Home)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledHome />
    </ThemeProvider>
  );
}

export default App;
