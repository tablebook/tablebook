import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";

import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material";
import EditorContext from "../contexts/EditorContext";
import theme from "../theme";
import {
  mockEditorContextState,
  mockMinutesContextState,
} from "../util/test.helpers";
import i18n from "../i18n/config";
import MinutesContext from "../contexts/MinutesContext";
import ColorSettingsPopup from "./ColorSettingsPopup";

const mockHandleSignatureAffectingChange = vi.fn();

vi.mock("../util/useHandleSignatureAffectingChange", () => {
  return {
    default: () => mockHandleSignatureAffectingChange,
  };
});

describe("ColorSettingsPopup", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();
  beforeEach(() => {
    render(
      <EditorContext.Provider
        value={[
          {
            ...mockEditorContextState,
            colorSettingsPopupAnchorElement: document.createElement("button"),
          },
          updateEditorMock,
        ]}
      >
        <MinutesContext.Provider
          value={[
            mockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <ColorSettingsPopup />
            </I18nextProvider>
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
    // This does something for the popup element to properly finish doing all it's logic so that warnings are not given.
    // The warning indicates that it would still doing something after the test is done.
    // Vitest waitFor doesn't work
    waitFor(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render all components", () => {
    const titleElement = screen.getByText("Color settings");
    const textColorElement = screen.getByText("Text color");
    const backgroundColorElement = screen.getByText("Background color");
    const restoreButton = screen.getByText("Restore Defaults");
    const colorpickerButtons = screen.getAllByTestId("colorpicker-button");

    expect(titleElement).toBeDefined();
    expect(textColorElement).toBeDefined();
    expect(backgroundColorElement).toBeDefined();
    expect(restoreButton).toBeDefined();
    expect(colorpickerButtons.length).toBe(2);
  });

  test("should check signatures and update minutes colors when restore clicked", () => {
    mockHandleSignatureAffectingChange.mockReturnValueOnce(true);
    const restoreButton = screen.getByText("Restore Defaults");

    restoreButton.click();

    expect(mockHandleSignatureAffectingChange).toHaveBeenCalledOnce();
    expect(updateMinutesMock).toHaveBeenCalledOnce({
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
      },
    });
  });

  test("should NOT update minutes colors when restore clicked IF confirm cancelled", () => {
    mockHandleSignatureAffectingChange.mockReturnValueOnce(false);
    const restoreButton = screen.getByText("Restore Defaults");

    restoreButton.click();

    expect(mockHandleSignatureAffectingChange).toHaveBeenCalledOnce();
    expect(updateMinutesMock).not.toHaveBeenCalled();
  });

  test("should display correct colors on picker buttons", () => {
    const colorpickerButtons = screen.getAllByTestId("colorpicker-button");

    const styles = colorpickerButtons.map((button) =>
      window.getComputedStyle(button),
    );

    expect(styles[0].backgroundColor).toBe("rgb(0, 0, 255)");
    expect(styles[1].backgroundColor).toBe("rgb(255, 0, 255)");
  });
});
