import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import Editor from "./Editor";
import MinutesContext from "../contexts/MinutesContext";
import theme from "../theme";
import { mockMinutesContextState } from "../util/test.helpers";

describe("Editor", () => {
  beforeEach(() => {
    render(
      <MinutesContext.Provider value={[mockMinutesContextState, {}]}>
        <ThemeProvider theme={theme}>
          <Editor />
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  });

  test("renders title component", () => {
    const titleComponent = screen.getByTestId("title-component");
    expect(titleComponent).toBeDefined();
  });

  test("renders the right amount of segment components", () => {
    const segmentComponents = screen.getAllByTestId("segment-component");
    expect(segmentComponents.length).toBe(
      mockMinutesContextState.minutes.segments.length,
    );
  });

  test("renders the right amount of segmentButton components", () => {
    const segmentComponents = screen.getAllByTestId("segment-buttons");
    expect(segmentComponents.length).toBe(
      mockMinutesContextState.minutes.segments.length,
    );
  });

  test("renders signature component", () => {
    const signatureComponent = screen.getByTestId("signature-component");
    expect(signatureComponent).toBeDefined();
  });
});
