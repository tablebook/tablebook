import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { I18nextProvider } from "react-i18next";
import theme from "./theme";
import i18n from "./i18n/config";
import App from "./App";
import { MinutesContextProvider } from "./contexts/MinutesContext";
import { EditorContextProvider } from "./contexts/EditorContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <EditorContextProvider>
    <MinutesContextProvider>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </I18nextProvider>
      </ThemeProvider>
    </MinutesContextProvider>
  </EditorContextProvider>,
);
