import React from "react";

import Routes from "./routes";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003451",
    },
    secondary: {
      main: "#DFAF00",
    },
  },
  typography: {
    fontFamily: ["Lato"],
    fontSize: 12.8,
    allVariants: {
      fontWeight: 700,
    },
  },
  button: {},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
