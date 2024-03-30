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

  test("renders signature image with correct source", () => {
    const signatureImage = screen.getByAltText("Signature");
    const expectedBase64String =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAB7CAYAAACb4F7QAAAAAXNSR0I";
    expect(signatureImage).toHaveAttribute("src", expectedBase64String);
  });

  test("renders signer name clarification", () => {
    const nameClarification = screen.getByText("Test User");
    expect(nameClarification).toBeInTheDocument();
  });

  test("renders date timestamp", () => {
    const dateString = screen.getByText("2024-03-30");
    const timeString = screen.getByText("00:00");
    expect(dateString).toBeInTheDocument();
    expect(timeString).toBeInTheDocument();
  });
});
