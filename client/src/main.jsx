import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#7E83A0",
    },
    secondary: {
      main: "#F3C297",
    },
    background: {
      default: "#FFE3BE",
    },
    delete: {
      default: "#F53C3C",
    },
    confirm: {
      default: "#00FF1A"
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
