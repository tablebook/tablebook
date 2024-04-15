import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import i18n from "../i18n/config";
import Footer from "./Footer";

import theme from "../theme";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <Footer />
          </I18nextProvider>
        </ThemeProvider>
      </BrowserRouter>,
    );
  });

  test("renders report button", () => {
    const reportButton = screen.getByText("Report an issue", { selector: "a" });
    expect(reportButton).toBeDefined();
    expect(reportButton.href).toEqual(
      "https://github.com/tablebook/tablebook/issues/new",
    );
  });

  test("renders github link", () => {
    const githubButton = screen.getByText("GitHub", { selector: "a" });
    expect(githubButton).toBeDefined();
    expect(githubButton.href).toEqual("https://github.com/tablebook/tablebook");
  });

  test("renders copyright button", () => {
    const copyrightButton = screen.getByText("Copyright", { selector: "a" });
    expect(copyrightButton).toBeDefined();
    expect(copyrightButton.href).toEqual(
      "https://github.com/tablebook/tablebook/blob/main/LICENSE",
    );
  });
});
