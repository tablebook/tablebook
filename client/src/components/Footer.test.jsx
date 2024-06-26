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
    const reportButton = screen.getByTestId("reportButton", { selector: "a" });
    expect(reportButton).toBeDefined();
    expect(reportButton.href).toEqual(
      "https://github.com/tablebook/tablebook/issues/new",
    );
    expect(reportButton).toHaveAttribute("target", "_blank");
  });

  test("renders github link", () => {
    const githubButton = screen.getByTestId("gitHubButton", { selector: "a" });
    expect(githubButton).toBeDefined();
    expect(githubButton.href).toEqual("https://github.com/tablebook/tablebook");
    expect(githubButton).toHaveAttribute("target", "_blank");
  });

  test("renders markdown link", () => {
    const markdownButton = screen.getByTestId("markdownButton", {
      selector: "a",
    });
    expect(markdownButton).toBeDefined();
    expect(markdownButton.href).toEqual(
      "https://www.markdownguide.org/basic-syntax/",
    );
    expect(markdownButton).toHaveAttribute("target", "_blank");
  });

  test("renders copyright button", () => {
    const copyrightButton = screen.getByTestId("copyrightButton", {
      selector: "a",
    });
    expect(copyrightButton).toBeDefined();
    expect(copyrightButton.href).toEqual(
      "https://github.com/tablebook/tablebook/blob/main/LICENSE",
    );
    expect(copyrightButton).toHaveAttribute("target", "_blank");
  });
});
