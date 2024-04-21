import React from "react";
import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import { mockMinutesContextState } from "../util/test.helpers";
import theme from "../theme";
import i18n from "../i18n/config";
import DownloadPDFButton from "./DownloadPDFButton";

describe("DownloadPDFButton", () => {
  const mockErrorToast = vi.spyOn(toast, "error");

  const renderWith = () => {
    render(
      <EditorContext.Provider>
        <MinutesContext.Provider value={[mockMinutesContextState]}>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <DownloadPDFButton />
            </I18nextProvider>
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
  };

  beforeEach(() => {
    vi.mock("@react-pdf/renderer", async () => {
      const originalModule = await vi.importActual("@react-pdf/renderer");

      const usePDF = vi.fn(() => [
        { loading: global.testPDFLoading, error: global.testPDFError },
        vi.fn(), // Mock function to simulate updating the PDF instance
      ]);

      return {
        ...originalModule,
        usePDF,
      };
    });
  });

  afterEach(async () => {
    vi.clearAllMocks();
    global.testPDFLoading = undefined;
    global.testPDFError = undefined;
  });

  describe("downloadPDFButton is ready", () => {
    beforeEach(async () => {
      global.testPDFLoading = false;
      global.testPDFError = null;
      renderWith();
    });

    test("renders Download PDF button", () => {
      const downloadPDF = screen.getByText("Download PDF", {
        selector: "button",
      });
      expect(downloadPDF).toBeDefined();
    });
  });

  describe("downloadPDFButton is loading", () => {
    beforeEach(async () => {
      global.testPDFLoading = true;
      global.testPDFError = null;
      renderWith();
    });

    test("renders Loading document button that is disabled", () => {
      const loadingDocument = screen.getByText("Loading document", {
        selector: "button",
      });
      expect(loadingDocument).toBeDefined();
      expect(loadingDocument).toBeDisabled();
    });
  });

  describe("downloadPDFButton is throwing error", () => {
    beforeEach(async () => {
      global.testPDFLoading = false;
      global.testPDFError = true;
      renderWith();
    });

    test("renders Error in PDF generation button that is disabled", () => {
      const errorInPDFGeneration = screen.getByText("Error in PDF generation", {
        selector: "button",
      });
      expect(errorInPDFGeneration).toBeDefined();
      expect(errorInPDFGeneration).toBeDisabled();
    });

    test("notifies user with error message toast when error occurs", () => {
      expect(mockErrorToast).toHaveBeenCalled("Error in PDF generation");
    });
  });
});
