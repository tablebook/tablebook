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
import ColorPickerPopup from "./ColorPickerPopup";
import MinutesContext from "../contexts/MinutesContext";

const mockHandleSignatureAffectingChange = vi.fn();

vi.mock("../util/useHandleSignatureAffectingChange", () => {
  return {
    default: () => mockHandleSignatureAffectingChange,
  };
});

describe("ColorPickerPopup", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();
  beforeEach(() => {
    render(
      <EditorContext.Provider
        value={[
          {
            ...mockEditorContextState,
            colorPickerPopupAnchorElement: document.createElement("button"),
            colorPickerPopupColor: "primary",
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
              <ColorPickerPopup />
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

  test("should render color picker components", () => {
    const colorPicker = screen.getByTestId("colorpicker");
    const colorInput = screen.getByTestId("colorinput");
    const container = screen.getByTestId("colorpicker-container");

    expect(container).toBeDefined();
    expect(colorPicker).toBeDefined();
    expect(colorInput).toBeDefined();
  });

  test("should render correct default colors", () => {
    const colorInState = mockMinutesContextState.minutes.colors.primary;

    const colorInputWithCorrectValue = screen.getByDisplayValue(
      colorInState.replace("#", ""),
    );

    expect(colorInputWithCorrectValue).toBeDefined();
  });
});
