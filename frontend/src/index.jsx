import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MiniDrawer from "./components/sidebar";
import "./index.css";
import "@fontsource/inter";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/roboto-condensed";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
  },
});
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <MiniDrawer />
    </ThemeProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
