import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import Editor from "./Editor";
import MinutesContext from "../contexts/MinutesContext";
import theme from "../theme";

describe("Editor", () => {
  const mockedContext = {
    minutes: {
      name: "",
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
      },
      segments: [
        {
          name: "Agenda",
          content: "Some content",
        },
        {
          name: "Decisions",
          content: "Some content",
        },
      ],
      startTime: null,
      signatures: [],
    },

    metadata: {
      writeAccess: null,
      token: null,
    },
  };

  beforeEach(() => {
    render(
      <MinutesContext.Provider value={[mockedContext]}>
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
    expect(editorButtons).toHaveLength(mockedContext.minutes.segments.length);
  });

  test("renders the righ amount of content components", () => {
    const contentComponent = screen.getAllByTestId("content-component");
    expect(contentComponent).toHaveLength(
      mockedContext.minutes.segments.length,
    );
  });

  test("renders signature and date sections", () => {
    const signatureSection = screen.getByText("Signature");
    const dateSection = screen.getByText("Date");
    expect(signatureSection).toBeInTheDocument();
    expect(dateSection).toBeInTheDocument();
  });
});
