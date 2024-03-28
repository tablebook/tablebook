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
      <MinutesContext.Provider value={[mockMinutesContextState]}>
        <ThemeProvider theme={theme}>
          <Editor />
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  });

  test("renders title input with correct placeholder", () => {
    const titleInput = screen.getByPlaceholderText("Enter main title");
    expect(titleInput).toBeInTheDocument();
  });

  test("renders the righ amount of editor buttons", () => {
    const editorButtons = screen.getAllByTestId("editor-buttons");
    expect(editorButtons).toHaveLength(
      mockMinutesContextState.minutes.segments.length,
    );
  });

  test("renders the righ amount of content components", () => {
    const contentComponent = screen.getAllByTestId("content-component");
    expect(contentComponent).toHaveLength(
      mockMinutesContextState.minutes.segments.length,
    );
  });

  test("renders signature and date sections", () => {
    const signatureSection = screen.getByText("Signature");
    const dateSection = screen.getByText("Date");
    expect(signatureSection).toBeInTheDocument();
    expect(dateSection).toBeInTheDocument();
  });
});
