import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/config";
import PreviewPrintPDFModal from "./PreviewPrintPDFModal";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import theme from "../theme";
import { mockMinutesContextState } from "../util/test.helpers";

describe("PreviewPrintPDFModal", () => {
  const updateEditorMock = vi.fn();

  const renderComponent = () => {
    render(
      <EditorContext.Provider
        value={[{ isPreviewPrintPDFModalOpen: true }, updateEditorMock]}
      >
        <MinutesContext.Provider value={[mockMinutesContextState]}>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <PreviewPrintPDFModal />
            </I18nextProvider>
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
  };

  beforeEach(() => {
    vi.mock("@react-pdf/renderer", async () => {
      const originalModule = await vi.importActual("@react-pdf/renderer");

      const StyleSheet = {
        ...originalModule.StyleSheet,
        create: (styles) => styles,
      };
      const PDFViewer = vi.fn(() => <div data-testid="pdf-viewer" />);
      const usePDF = vi.fn(() => [
        { loading: global.testPDFLoading, error: global.testPDFError },
        vi.fn(), // Mock function to simulate updating the PDF instance
      ]);

      return {
        ...originalModule,
        StyleSheet,
        PDFViewer,
        usePDF,
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.testPDFLoading = undefined;
    global.testPDFError = undefined;
  });

  describe("Normal State", () => {
    beforeEach(async () => {
      global.testPDFLoading = false;
      global.testPDFError = null;
      renderComponent();
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

    test("renders print pdf button", () => {
      const printPDFButton = screen.getByText("Print PDF", {
        selector: "button",
      });
      expect(printPDFButton).toBeDefined();
    });

    test("renders download pdf button", () => {
      const downloadPDFButton = screen.getByText("Download PDF", {
        selector: "button",
      });
      expect(downloadPDFButton).toBeDefined();
    });
  });

  describe("Document loading", () => {
    beforeEach(async () => {
      global.testPDFLoading = true;
      global.testPDFError = null;
      renderComponent();
    });

    test("print pdf button shows loading state and is disabled", () => {
      const printPDFButton = screen.getByTestId("print-pdf-button");
      expect(printPDFButton).toBeInTheDocument();
      expect(printPDFButton).toHaveTextContent("Loading document");
      expect(printPDFButton).toBeDisabled();
    });

    test("download pdf button shows loading state and is disabled", () => {
      const downloadPDFButton = screen.getByTestId("download-pdf-button");
      expect(downloadPDFButton).toBeInTheDocument();
      expect(downloadPDFButton).toHaveTextContent("Loading document");
      expect(downloadPDFButton).toBeDisabled();
    });
  });

  describe("Error while document generation", () => {
    beforeEach(async () => {
      global.testPDFLoading = false;
      global.testPDFError = true;
      renderComponent();
    });

    test("print pdf button shows error state and is disabled", () => {
      const printPDFButton = screen.getByTestId("print-pdf-button-error");
      expect(printPDFButton).toBeInTheDocument();
      expect(printPDFButton).toHaveTextContent("Error in PDF generation");
      expect(printPDFButton).toBeDisabled();
    });
    test("download pdf button shows error state and is disabled", () => {
      const downloadPDFButton = screen.getByTestId("download-pdf-button-error");
      expect(downloadPDFButton).toBeInTheDocument();
      expect(downloadPDFButton).toHaveTextContent("Error in PDF generation");
      expect(downloadPDFButton).toBeDisabled();
    });
  });
});
