import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import theme from "../theme";
import ReloadPopup from "./ReloadPopup";
import EditorContext from "../contexts/EditorContext";
import { mockEditorContextState } from "../util/test.helpers";

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

describe("ReloadPopup", () => {
  const updateEditorMock = vi.fn();

  afterEach(async () => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    render(
      <EditorContext.Provider
        value={[
          {
            ...mockEditorContextState,
            reloadPopupAnchorElement: document.createElement("button"),
          },
          updateEditorMock,
        ]}
      >
        <ThemeProvider theme={theme}>
          <ReloadPopup />
        </ThemeProvider>
      </EditorContext.Provider>,
    );
    // This does something for the popup element to properly finish doing all it's logic so that warnings are not given.
    // The warning indicates that it would still doing something after the test is done.
    // Vitest waitFor doesn't work
    waitFor(() => {});
  });

  test("renders the title", () => {
    const titleElement = screen.getByText("Different version detected");
    expect(titleElement).toBeDefined();
  });

  test("renders the message", () => {
    const messageElement = screen.getByText(
      "There is a different version of this saved minutes in the cloud. Do you want to reload? Otherwise, consider saving.",
    );
    expect(messageElement).toBeDefined();
  });

  describe("Reload button", () => {
    test("renders", () => {
      const saveButton = screen.getByText("Reload", { selector: "button" });
      expect(saveButton).toBeDefined();
    });

    test("calls reloadMinutesHook", () => {
      const reloadButton = screen.getByText("Reload", { selector: "button" });
      reloadButton.click();

      expect(mockReloadMinutes).toHaveBeenCalledOnce();
    });
  });

  describe("Save button", () => {
    test("renders", () => {
      const saveButton = screen.getByText("Save", { selector: "button" });
      expect(saveButton).toBeDefined();
    });

    test("calls saveMinutesHook", () => {
      const saveButton = screen.getByText("Save", { selector: "button" });
      saveButton.click();

      expect(mockSaveMinutes).toHaveBeenCalledOnce();
    });
  });
});
