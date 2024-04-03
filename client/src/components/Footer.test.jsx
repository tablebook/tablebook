import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";

import theme from "../theme";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Footer />
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
