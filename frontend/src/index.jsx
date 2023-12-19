import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MiniDrawer from "./components/sidebar";

ReactDOM.render(
  <BrowserRouter>
    <MiniDrawer />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
