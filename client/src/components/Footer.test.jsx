import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";

import theme from "../theme";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>,
    );
  });

  test("renders report button", () => {
    const reportButton = screen.getByText("Report", { selector: "h5" });
    expect(reportButton).toBeDefined();
  });

  test("renders github link", () => {
    const githubButton = screen.getByText("GitHub", { selector: "a" });
    expect(githubButton).toBeDefined();
    expect(githubButton.href).toEqual("https://github.com/tablebook/tablebook");
  });

  test("renders copyright button", () => {
    const copyrightButton = screen.getByText("Copyright", { selector: "h5" });
    expect(copyrightButton).toBeDefined();
  });
});
