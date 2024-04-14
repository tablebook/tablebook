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

  vi.mock("@react-pdf/renderer", async () => {
    const originalModule = await vi.importActual("@react-pdf/renderer");
    const StyleSheet = {
      ...originalModule.StyleSheet,
      create: (styles) => styles,
    };
    const PDFViewer = vi.fn(() => <div data-testid="pdf-viewer" />);
    const BlobProvider = vi.fn(({ children }) =>
      children({ url: "mocked-url", loading: false }),
    );
    const PDFDownloadLink = vi.fn(({ children }) =>
      children({
        loading: false,
        error: null,
        blob: new Blob(["pdf content"], { type: "application/pdf" }),
        url: "mocked-url",
      }),
    );

    return {
      ...originalModule,
      StyleSheet,
      PDFViewer,
      BlobProvider,
      PDFDownloadLink,
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
            <I18nextProvider i18n={i18n}>
              <PreviewPrintPDFModal />
            </I18nextProvider>
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
