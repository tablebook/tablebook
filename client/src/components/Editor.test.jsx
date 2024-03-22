import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import Editor from "./Editor.jsx";
import MinutesContext from "../contexts/MinutesContext.jsx";
import theme from "../theme";

describe("Editor", () => {
  const mockedContext = {
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
  };

  const MockedProvider = ({ children }) => (
    <MinutesContext.Provider value={[mockedContext]}>
      {children}
    </MinutesContext.Provider>
  );

  beforeEach(() => {
    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <Editor />
        </ThemeProvider>
      </MockedProvider>,
    );
  });

  test("renders title input with correct placeholder", () => {
    const titleInput = screen.getByPlaceholderText("Enter main title");
    expect(titleInput).toBeInTheDocument();
  });

  test("renders the righ amount of editor buttons", () => {
    const editorButtons = screen.getAllByTestId("editor-buttons");
    expect(editorButtons).toHaveLength(mockedContext.segments.length);
  });

  test("renders the righ amount of content components", () => {
    const contentComponent = screen.getAllByTestId("content-component");
    expect(contentComponent).toHaveLength(mockedContext.segments.length);
  });

  test("renders signature and date sections", () => {
    const signatureSection = screen.getByText("Signature");
    const dateSection = screen.getByText("Date");
    expect(signatureSection).toBeInTheDocument();
    expect(dateSection).toBeInTheDocument();
  });
});
