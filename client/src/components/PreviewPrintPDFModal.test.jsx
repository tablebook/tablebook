import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import PreviewPrintPDFModal from "./PreviewPrintPDFModal";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import theme from "../theme";
import { mockMinutesContextState } from "../util/test.helpers";

describe("PreviewPrintPDFModal", () => {
  const updateEditorMock = vi.fn();

  vi.mock("@react-pdf/renderer", async () => {
    const originalModule = await vi.importActual("@react-pdf/renderer");
    const StyleSheet = {
      ...originalModule.StyleSheet,
      create: (styles) => styles,
    };
    const PDFViewer = vi.fn(() => <div data-testid="pdf-viewer" />);

    return {
      ...originalModule,
      StyleSheet,
      PDFViewer,
    };
  });

  beforeEach(async () => {
    render(
      <EditorContext.Provider
        value={[
          {
            isPreviewPrintPDFModalOpen: true,
          },
          updateEditorMock,
        ]}
      >
        <MinutesContext.Provider value={[mockMinutesContextState]}>
          <ThemeProvider theme={theme}>
            <PreviewPrintPDFModal />
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders PDFDocument", () => {
    const pdfViewerElement = screen.getByTestId("pdf-viewer");
    expect(pdfViewerElement).toBeDefined();
  });

  test("renders close window button", () => {
    const CloseWindowButton = screen.getByText("Close window", {
      selector: "button",
    });
    expect(CloseWindowButton).toBeDefined();
  });

  test("handles modal close when close window is clicked", () => {
    const CloseWindowButton = screen.getByText("Close window", {
      selector: "button",
    });
    fireEvent.click(CloseWindowButton);
    expect(updateEditorMock).toBeCalledWith({
      isPreviewPrintPDFModalOpen: false,
    });
  });
});