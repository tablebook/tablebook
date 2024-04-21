import React from "react";
import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import * as deviceDetect from "react-device-detect";
import i18n from "../i18n/config";
import TopBar from "./TopBar";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import {
  mockEditorContextState,
  mockMinutesContextState,
  mockPostMinutesResponse,
} from "../util/test.helpers";
import theme from "../theme";
import minutesService from "../services/minutesService";

const mockSaveMinutes = vi.fn();
const mockReloadMinutes = vi.fn();

vi.mock("../util/useSaveMinutes", () => {
  return {
    default: () => mockSaveMinutes,
  };
});

vi.mock("../util/useReloadMinutes", () => {
  return {
    default: () => mockReloadMinutes,
  };
});

describe("TopBar", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();
  const updateMetadataMock = vi.fn();
  const clearStateMock = vi.fn();

  const mockErrorToast = vi.spyOn(toast, "error");

  const renderWith = (mockMinutesState) => {
    render(
      <BrowserRouter>
        <MinutesContext.Provider
          value={[
            mockMinutesState,
            {
              updateMinutes: updateMinutesMock,
              updateMetadata: updateMetadataMock,
              clearState: clearStateMock,
            },
          ]}
        >
          <EditorContext.Provider
            value={[mockEditorContextState, updateEditorMock]}
          >
            <ThemeProvider theme={theme}>
              <I18nextProvider i18n={i18n}>
                <TopBar />
              </I18nextProvider>
            </ThemeProvider>
          </EditorContext.Provider>
        </MinutesContext.Provider>
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    vi.mock("@react-pdf/renderer", async () => {
      const originalModule = await vi.importActual("@react-pdf/renderer");

      const usePDF = vi.fn(() => [
        { loading: false, error: null },
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
  });

  describe("desktiop devices", () => {
    beforeEach(() => {
      // eslint-disable-next-line no-import-assign
      deviceDetect.isMobile = false;
    });

    describe("with unsaved minutes", () => {
      beforeEach(() => {
        renderWith({
          ...mockMinutesContextState,
          metadata: {
            readToken: null,
            writeAccess: null,
            writeToken: null,
          },
        });
      });

      test("renders the title", () => {
        const titleElement = screen.getByText("TableBook").closest("a");
        expect(titleElement).toBeDefined();
        expect(titleElement.href).toEqual("http://localhost:3000/minutes");
      });

      test("renders LanguagePickerContainer", () => {
        const languagePickerContainer = screen.getByTestId("flagTrigger");
        expect(languagePickerContainer).toBeDefined();
      });

      test("renders correct storage status", () => {
        const storageStatus = screen.getByText("Minutes not stored");
        expect(storageStatus).toBeInTheDocument();
      });

      describe("Create New Button", () => {
        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("renders", () => {
          const createNewButton = screen.getByText("Create New", {
            selector: "button",
          });
          expect(createNewButton).toBeDefined();
        });

        test("clears the state on confirm", async () => {
          window.confirm.mockReturnValueOnce(true);

          const createNewButton = screen.getByText("Create New", {
            selector: "button",
          });

          createNewButton.click();

          await waitFor(() => {
            expect(window.confirm).toHaveBeenCalledOnce();
            expect(clearStateMock).toHaveBeenCalledOnce();
          });
        });

        test("doesn't clear the state on cancel", async () => {
          window.confirm.mockReturnValueOnce(false);

          const createNewButton = screen.getByText("Create New", {
            selector: "button",
          });

          createNewButton.click();

          await waitFor(() => {
            expect(window.confirm).toHaveBeenCalledOnce();
            expect(clearStateMock).not.toHaveBeenCalledOnce();
          });
        });
      });

      test("doesn't render reload button", () => {
        const reloadButton = screen.queryByText("Reload", {
          selector: "button",
        });
        expect(reloadButton).not.toBeInTheDocument();
      });

      test("doesn't render save button", () => {
        const saveButton = screen.queryByText("Save", {
          selector: "button",
        });
        expect(saveButton).not.toBeInTheDocument();
      });

      describe("Share button", () => {
        const mockCreateMinutes = vi.spyOn(minutesService, "createMinutes");

        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("renders", () => {
          const shareButton = screen.getByText("Share", {
            selector: "button",
          });
          expect(shareButton).toBeDefined();
        });

        test("opens confirm dialogue on click, calls minutesService, and sets contexts properly", async () => {
          window.confirm.mockReturnValueOnce(true);
          mockCreateMinutes.mockResolvedValueOnce(mockPostMinutesResponse);

          const shareButton = screen.getByText("Share", {
            selector: "button",
          });

          shareButton.click();

          // Waits for async calls to finish
          await waitFor(() => {
            expect(window.confirm).toHaveBeenCalledOnce();
            expect(mockCreateMinutes).toHaveBeenCalledOnce();
            expect(updateMetadataMock).toHaveBeenCalledOnce();
            expect(updateMetadataMock).toHaveBeenCalledWith({
              writeAccess: true,
              writeToken: mockPostMinutesResponse.writeToken,
              readToken: mockPostMinutesResponse.readToken,
            });
            expect(updateEditorMock).toHaveBeenCalledOnce();
            expect(
              updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
            ).toBeDefined();
            expect(
              updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
            ).toHaveRole("button");
            expect(mockErrorToast).not.toHaveBeenCalled();
          });
        });

        test("notifies user with error message toast when error occurs", async () => {
          window.confirm.mockReturnValueOnce(true);
          mockCreateMinutes.mockRejectedValueOnce();

          const shareButton = screen.getByText("Share", {
            selector: "button",
          });

          shareButton.click();

          await waitFor(() => {
            expect(window.confirm).toHaveBeenCalledOnce();
            expect(mockErrorToast).toHaveBeenCalled(
              "Error while sharing minutes",
            );
          });
        });

        test("doesn't do anything when confirm dialogue is cancelled", async () => {
          window.confirm.mockReturnValueOnce(false);
          mockCreateMinutes.mockResolvedValueOnce(mockPostMinutesResponse);

          const shareButton = screen.getByText("Share", {
            selector: "button",
          });

          shareButton.click();

          // Waits for async calls to finish
          await waitFor(() => {
            expect(window.confirm).toHaveBeenCalledOnce();
            expect(mockCreateMinutes).not.toHaveBeenCalled();
          });
        });
      });

      describe("PreviewPrintPDFModal", () => {
        test("renders preview and print pdf button", () => {
          const previwePrintPdfButton = screen.getByText("Preview/Print PDF", {
            selector: "button",
          });
          expect(previwePrintPdfButton).toBeDefined();
        });

        test("opens PreviewPrintPDFModal on preview and print pdf button click", () => {
          const previwePrintPdfButton = screen.getByText("Preview/Print PDF", {
            selector: "button",
          });
          fireEvent.click(previwePrintPdfButton);
          expect(updateEditorMock).toBeCalledWith({
            isPreviewPrintPDFModalOpen: true,
          });
        });

        test("does not render DownloadPDFButton on desktop", () => {
          const downloadPDFButton = screen.queryByText("Download PDF", {
            selector: "button",
          });
          expect(downloadPDFButton).toBeNull();
        });
      });
    });

    describe("with saved minutes and write access", () => {
      beforeEach(() => {
        renderWith(mockMinutesContextState);
      });

      test("renders LanguagePickerContainer", () => {
        const languagePickerContainer = screen.getByTestId("flagTrigger");
        expect(languagePickerContainer).toBeDefined();
      });

      test("renders correct storage status", () => {
        const storageStatus = screen.getByText("Editing stored minutes");
        expect(storageStatus).toBeInTheDocument();
      });

      describe("Save button", () => {
        test("renders", () => {
          const saveButton = screen.getByText("Save", {
            selector: "button",
          });
          expect(saveButton).toBeDefined();
        });

        test("calls saveMinutes hook", () => {
          const saveButton = screen.getByText("Save", {
            selector: "button",
          });
          saveButton.click();

          expect(mockSaveMinutes).toHaveBeenCalledOnce();
        });
      });

      describe("Reload button", () => {
        test("renders", () => {
          const reloadButton = screen.getByText("Reload", {
            selector: "button",
          });
          expect(reloadButton).toBeInTheDocument();
        });

        test("calls reloadMinutes hook", () => {
          const reloadButton = screen.getByText("Reload", {
            selector: "button",
          });
          reloadButton.click();

          expect(mockReloadMinutes).toHaveBeenCalledOnce();
        });
      });

      describe("Share button", () => {
        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("renders", () => {
          const shareButton = screen.getByText("Share", {
            selector: "button",
          });
          expect(shareButton).toBeDefined();
        });

        test("doesn't open dialogue or send minutes. Only sets editor context", async () => {
          const mockCreateMinutes = vi.spyOn(minutesService, "createMinutes");
          mockCreateMinutes.mockResolvedValueOnce(mockPostMinutesResponse);

          const shareButton = screen.getByText("Share", {
            selector: "button",
          });

          shareButton.click();

          // Waits for async calls to finish
          await waitFor(() => {
            expect(window.confirm).not.toHaveBeenCalled();
            expect(mockCreateMinutes).not.toHaveBeenCalled();
            expect(updateMetadataMock).not.toHaveBeenCalled();
            expect(updateEditorMock).toHaveBeenCalledOnce();
            expect(
              updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
            ).toBeDefined();
            expect(
              updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
            ).toHaveRole("button");
          });
        });
      });
    });

    describe("with saved minutes and no write access", () => {
      beforeEach(() => {
        renderWith({
          ...mockMinutesContextState,
          metadata: {
            ...mockMinutesContextState.metadata,
            writeAccess: false,
            writeToken: null,
          },
        });
      });

      test("renders LanguagePickerContainer", () => {
        const languagePickerContainer = screen.getByTestId("flagTrigger");
        expect(languagePickerContainer).toBeDefined();
      });

      test("renders correct storage status", () => {
        const storageStatus = screen.getByText("Reading stored minutes");
        expect(storageStatus).toBeInTheDocument();
      });

      describe("Reload button", () => {
        test("renders", () => {
          const reloadButton = screen.getByText("Reload", {
            selector: "button",
          });
          expect(reloadButton).toBeInTheDocument();
        });

        test("calls reloadMinutes hook", () => {
          const reloadButton = screen.getByText("Reload", {
            selector: "button",
          });
          reloadButton.click();

          expect(mockReloadMinutes).toHaveBeenCalledOnce();
        });
      });

      test("doesn't render save button", () => {
        const saveButton = screen.queryByText("Save", {
          selector: "button",
        });
        expect(saveButton).not.toBeInTheDocument();
      });

      describe("Share button", () => {
        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("renders", () => {
          const shareButton = screen.getByText("Share", {
            selector: "button",
          });
          expect(shareButton).toBeDefined();
        });

        test("doesn't open dialogue or send minutes. Only sets editor context", async () => {
          const mockCreateMinutes = vi.spyOn(minutesService, "createMinutes");
          mockCreateMinutes.mockResolvedValueOnce(mockPostMinutesResponse);

          const shareButton = screen.getByText("Share", {
            selector: "button",
          });

          shareButton.click();

          // Waits for async calls to finish
          await waitFor(() => {
            expect(window.confirm).not.toHaveBeenCalled();
            expect(mockCreateMinutes).not.toHaveBeenCalled();
            expect(updateMetadataMock).not.toHaveBeenCalled();
            expect(updateEditorMock).toHaveBeenCalledOnce();
            expect(
              updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
            ).toBeDefined();
            expect(
              updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
            ).toHaveRole("button");
          });
        });
      });
    });
  });
  describe("mobile devices", () => {
    beforeEach(() => {
      // eslint-disable-next-line no-import-assign
      deviceDetect.isMobile = true;
    });

    describe("renders DownloadPDFButton instead of PreviewPrintPDFModal button", () => {
      beforeEach(async () => {
        renderWith({
          ...mockMinutesContextState,
          metadata: {
            readToken: null,
            writeAccess: null,
            writeToken: null,
          },
        });
      });

      test("renders DownloadPDFButton", () => {
        const downloadPDF = screen.getByText("Download PDF", {
          selector: "button",
        });
        expect(downloadPDF).toBeDefined();
      });

      test("does not render PreviewPrintPDFModal button", () => {
        const PreviewPrintPDFModal = screen.queryByText("Preview/Print PDF", {
          selector: "button",
        });
        expect(PreviewPrintPDFModal).toBeNull();
      });
    });
  });
});
