import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import Editor from "./Editor.jsx";
import theme from "../theme";

describe("Editor", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Editor />
      </ThemeProvider>,
    );
  });

  test("renders title input with correct placeholder", () => {
    const titleInput = screen.getByPlaceholderText("Enter main title");
    expect(titleInput).toBeInTheDocument();
  });

  test("renders editor buttons", () => {
    const editorButtons = screen.getByTestId("editor-buttons");
    expect(editorButtons).toBeInTheDocument();
  });

  test("renders content component", () => {
    const contentComponent = screen.getByTestId("content-component");
    expect(contentComponent).toBeInTheDocument();
  });

  test("renders signature and date sections", () => {
    const signatureSection = screen.getByText("Signature");
    const dateSection = screen.getByText("Date");
    expect(signatureSection).toBeInTheDocument();
    expect(dateSection).toBeInTheDocument();
  });
});
