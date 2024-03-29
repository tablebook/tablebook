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

  beforeEach(() => {
    render(
      <MinutesContext.Provider
        value={[mockMinutesContextState, {}, updateMetadataMock]}
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

  test("renders create new button", () => {
    const createNewButton = screen.getByText("Create New", {
      selector: "button",
    });
    expect(createNewButton).toBeDefined();
  });

  test("renders revert button", () => {
    const revertButton = screen.getByText("Revert", {
      selector: "button",
    });
    expect(revertButton).toBeDefined();
  });

  test("renders save button", () => {
    const saveButton = screen.getByText("Save", {
      selector: "button",
    });
    expect(saveButton).toBeDefined();
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
