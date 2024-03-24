import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./i18n/config";
import App from "./App.jsx";
import { MinutesContextProvider } from "./contexts/MinutesContext.jsx";
import { EditorContextProvider } from "./contexts/EditorContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <EditorContextProvider>
    <MinutesContextProvider>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </MinutesContextProvider>
  </EditorContextProvider>,
);
