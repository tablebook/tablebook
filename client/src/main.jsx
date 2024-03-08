import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App.jsx";

const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#7E83A0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F3C297",
      contrastText: "#000000",
    },
    background: {
      main: "#FFE3BE",
      contrastText: "#000000",
    },
    delete: {
      main: "#F53C3C",
      contrastText: "#000000",
    },
    confirm: {
      main: "#00FF1A",
      contrastText: "#000000",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={colorTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
);
