import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import App from "./App.jsx";
import { MinutesContextProvider } from "./contexts/MinutesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MinutesContextProvider>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </MinutesContextProvider>,
);
