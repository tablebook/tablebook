import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import TopBar from "./TopBar.jsx";
import MinutesContext from "../contexts/MinutesContext.jsx";
import EditorContext from "../contexts/EditorContext.jsx";
import {
  mockEditorContextState,
  mockMinutesContextState,
} from "../util/test.helpers";
import theme from "../theme";
import minutesService from "../services/minutesService";

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
            <TopBar />
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
    expect(titleElement.href).toEqual("http://localhost:3000/");
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
    const mockConfirm = vi.fn();
    vi.stubGlobal("confirm", mockConfirm);

    test("renders", () => {
      const shareButton = screen.getByText("Share", {
        selector: "button",
      });
      expect(shareButton).toBeDefined();
    });

    test("opens confirm dialogue on click, calls minutesService, and sets contexts properly", async () => {
      window.confirm.mockReturnValueOnce(true);
      const mockCreateMinutes = vi.spyOn(minutesService, "createMinutes");
      mockCreateMinutes.mockResolvedValueOnce({
        data: {},
        writeToken: "writeaccesstoken",
        readToken: "readaccesstoken",
      });

      const shareButton = screen.getByText("Share", {
        selector: "button",
      });

      shareButton.click();

      // Waits for async calls to finish
      await vi.waitFor(
        () => {
          expect(window.confirm).toHaveBeenCalledOnce();
          expect(mockCreateMinutes).toHaveBeenCalledOnce();
          expect(updateMetadataMock).toHaveBeenCalledOnce();
          expect(updateMetadataMock).toHaveBeenCalledWith({
            writeAccess: true,
            writeToken: "writeaccesstoken",
            readToken: "readaccesstoken",
          });
          expect(updateEditorMock).toHaveBeenCalledOnce();
          expect(
            updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
          ).toBeDefined();
          expect(
            updateEditorMock.mock.calls[0][0].sharePopupAnchorElement,
          ).toHaveRole("button");
        },
        { timeout: 100 },
      );
    });
  });

  test("renders print pdf button", () => {
    const printPdfButton = screen.getByText("Print PDF", {
      selector: "button",
    });
    expect(printPdfButton).toBeDefined();
  });
});
