import React from "react";
import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import { RouterProvider } from "react-router-dom";
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
import router from "../router";

describe("TopBar", () => {
  const updateEditorMock = vi.fn();
  const updateMetadataMock = vi.fn();
  const clearStateMock = vi.fn();

  beforeEach(() => {
    render(
      <MinutesContext.Provider
        value={[
          mockMinutesContextState,
          { updateMetadata: updateMetadataMock, clearState: clearStateMock },
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
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  test("renders the title", () => {
    const titleElement = screen.getByText("TableBook").closest("a");
    expect(titleElement).toBeDefined();
    expect(titleElement.href).toEqual("http://localhost:3000/minutes");
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

  test("renders revert button", () => {
    const revertButton = screen.getByText("Revert", {
      selector: "button",
    });
    expect(revertButton).toBeDefined();
  });

  describe("Save button", () => {
    beforeEach(() => {
      vi.stubGlobal("alert", vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

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
        expect(alert).toHaveBeenCalledOnce();
        expect(alert).toHaveBeenCalledWith("Minutes saved successfully!");
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
        expect(alert).toHaveBeenCalledOnce();
        expect(alert).toHaveBeenCalledWith("Saving minutes failed");
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

    test("opens confirm dialogue on click, calls minutesService, and sets contexts properly", async () => {
      window.confirm.mockReturnValueOnce(true);
      const mockCreateMinutes = vi.spyOn(minutesService, "createMinutes");
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
      });
    });

    test("doesn't do anything when confirm dialogue is cancelled", async () => {
      window.confirm.mockReturnValueOnce(false);
      const mockCreateMinutes = vi.spyOn(minutesService, "createMinutes");
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

  test("renders print pdf button", () => {
    const printPdfButton = screen.getByText("Print PDF", {
      selector: "button",
    });
    expect(printPdfButton).toBeDefined();
  });
});
