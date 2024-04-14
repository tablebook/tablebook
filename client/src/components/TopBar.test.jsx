import React from "react";
import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { toast } from "react-toastify";
import TopBar from "./TopBar";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import {
  mockEditorContextState,
  mockGetMinutesResponse,
  mockMinutesContextState,
  mockPostMinutesResponse,
} from "../util/test.helpers";
import theme from "../theme";
import minutesService from "../services/minutesService";
import router from "../router";

describe("TopBar", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();
  const updateMetadataMock = vi.fn();
  const clearStateMock = vi.fn();

  const mockSuccessToast = vi.spyOn(toast, "success");
  const mockErrorToast = vi.spyOn(toast, "error");

  const renderWith = (mockMinutesState) => {
    render(
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
            <RouterProvider router={router}>
              <TopBar />
            </RouterProvider>
          </ThemeProvider>
        </EditorContext.Provider>
      </MinutesContext.Provider>,
    );
  };

  afterEach(async () => {
    vi.clearAllMocks();
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
  });

  describe("with saved minutes and write access", () => {
    beforeEach(() => {
      renderWith(mockMinutesContextState);
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

      test("calls minutesService and notifies user when successful", async () => {
        const mockUpdateMinutes = vi.spyOn(
          minutesService,
          "updateMinutesByToken",
        );
        mockUpdateMinutes.mockResolvedValueOnce(mockPostMinutesResponse);

        const saveButton = screen.getByText("Save", {
          selector: "button",
        });

        saveButton.click();

        await waitFor(() => {
          expect(mockUpdateMinutes).toHaveBeenCalledOnce();
          expect(mockUpdateMinutes).toHaveBeenCalledWith(
            mockMinutesContextState.metadata.writeToken,
            mockMinutesContextState.minutes,
          );
          expect(mockSuccessToast).toHaveBeenCalledOnce();
          expect(mockSuccessToast).toHaveBeenCalledWith(
            "Minutes saved successfully!",
          );
        });
      });

      test("calls minutesService and notifies user when service throws error", async () => {
        const mockUpdateMinutes = vi.spyOn(
          minutesService,
          "updateMinutesByToken",
        );
        mockUpdateMinutes.mockRejectedValueOnce();

        const saveButton = screen.getByText("Save", {
          selector: "button",
        });

        saveButton.click();

        await waitFor(() => {
          expect(mockUpdateMinutes).toHaveBeenCalledOnce();
          expect(mockErrorToast).toHaveBeenCalledOnce();
          expect(mockErrorToast).toHaveBeenCalledWith("Saving minutes failed");
        });
      });
    });

    describe("Reload button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("renders", () => {
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });
        expect(reloadButton).toBeInTheDocument();
      });

      test("fetches minutes and gets confirmation from user if they have changed", async () => {
        const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
        mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });
        window.confirm.mockReturnValueOnce(true);

        reloadButton.click();

        await waitFor(() => {
          expect(mockGetMinutes).toHaveBeenCalledOnce();
          expect(mockGetMinutes).toHaveBeenCalledWith(
            mockMinutesContextState.metadata.writeToken,
          );
          expect(window.confirm).toHaveBeenCalled();
          expect(updateMinutesMock).toHaveBeenCalledOnce();
          expect(updateMinutesMock).toHaveBeenCalledWith(
            mockGetMinutesResponse.data,
          );
          expect(updateMetadataMock).toHaveBeenCalledOnce();
          expect(updateMetadataMock).toHaveBeenCalledWith({
            writeAccess: true,
            readToken: mockGetMinutesResponse.readToken,
            writeToken: mockGetMinutesResponse.writeToken,
          });
          expect(mockSuccessToast).toHaveBeenCalledOnce();
          expect(mockSuccessToast).toHaveBeenCalledWith(
            "Successfully loaded minutes",
          );
        });
      });

      test("doesn't overwrite minutes when user declines confirmation", async () => {
        const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
        mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });
        window.confirm.mockReturnValueOnce(false);

        reloadButton.click();

        await waitFor(() => {
          expect(mockGetMinutes).toHaveBeenCalledOnce();
          expect(mockGetMinutes).toHaveBeenCalledWith(
            mockMinutesContextState.metadata.writeToken,
          );
          expect(window.confirm).toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalled();
          expect(updateMetadataMock).not.toHaveBeenCalled();
          expect(mockErrorToast).not.toHaveBeenCalled();
          expect(mockSuccessToast).not.toHaveBeenCalled();
        });
      });

      test("handles errors and notifies user", async () => {
        const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
        mockGetMinutes.mockRejectedValueOnce();
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });

        reloadButton.click();

        await waitFor(() => {
          expect(mockGetMinutes).toHaveBeenCalledOnce();
          expect(mockGetMinutes).toHaveBeenCalledWith(
            mockMinutesContextState.metadata.writeToken,
          );
          expect(window.confirm).not.toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalledOnce();
          expect(updateMetadataMock).not.toHaveBeenCalled();
          expect(mockErrorToast).toHaveBeenCalledOnce();
          expect(mockErrorToast).toHaveBeenCalledWith(
            "Reloading minutes failed",
          );
        });
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

    test("renders correct storage status", () => {
      const storageStatus = screen.getByText("Reading stored minutes");
      expect(storageStatus).toBeInTheDocument();
    });

    describe("Reload button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("renders", () => {
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });
        expect(reloadButton).toBeInTheDocument();
      });

      test("fetches minutes and gets confirmation from user if they have changed", async () => {
        const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
        mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });
        window.confirm.mockReturnValueOnce(true);

        reloadButton.click();

        await waitFor(() => {
          expect(mockGetMinutes).toHaveBeenCalledOnce();
          expect(mockGetMinutes).toHaveBeenCalledWith(
            mockMinutesContextState.metadata.readToken,
          );
          expect(window.confirm).toHaveBeenCalled();
          expect(updateMinutesMock).toHaveBeenCalledOnce();
          expect(updateMinutesMock).toHaveBeenCalledWith(
            mockGetMinutesResponse.data,
          );
          expect(updateMetadataMock).toHaveBeenCalledOnce();
          expect(updateMetadataMock).toHaveBeenCalledWith({
            writeAccess: true,
            readToken: mockGetMinutesResponse.readToken,
            writeToken: mockGetMinutesResponse.writeToken,
          });
          expect(mockSuccessToast).toHaveBeenCalledOnce();
          expect(mockSuccessToast).toHaveBeenCalledWith(
            "Successfully loaded minutes",
          );
        });
      });

      test("doesn't overwrite minutes when user declines confirmation", async () => {
        const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
        mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });
        window.confirm.mockReturnValueOnce(false);

        reloadButton.click();

        await waitFor(() => {
          expect(mockGetMinutes).toHaveBeenCalledOnce();
          expect(mockGetMinutes).toHaveBeenCalledWith(
            mockMinutesContextState.metadata.readToken,
          );
          expect(window.confirm).toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalled();
          expect(updateMetadataMock).not.toHaveBeenCalled();
          expect(mockErrorToast).not.toHaveBeenCalled();
          expect(mockSuccessToast).not.toHaveBeenCalled();
        });
      });

      test("handles errors and notifies user", async () => {
        const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
        mockGetMinutes.mockRejectedValueOnce();
        const reloadButton = screen.getByText("Reload", {
          selector: "button",
        });

        reloadButton.click();

        await waitFor(() => {
          expect(mockGetMinutes).toHaveBeenCalledOnce();
          expect(mockGetMinutes).toHaveBeenCalledWith(
            mockMinutesContextState.metadata.readToken,
          );
          expect(window.confirm).not.toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalledOnce();
          expect(updateMetadataMock).not.toHaveBeenCalled();
          expect(mockErrorToast).toHaveBeenCalledOnce();
          expect(mockErrorToast).toHaveBeenCalledWith(
            "Reloading minutes failed",
          );
        });
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
