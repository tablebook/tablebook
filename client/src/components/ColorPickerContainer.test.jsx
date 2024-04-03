import React from "react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import MinutesContext from "../contexts/MinutesContext";
import ColorPickerContainer from "./ColorPickerContainer";
import { mockMinutesContextState } from "../util/test.helpers";

describe("ColorPickerContainer", () => {
  const updateMinutesMock = vi.fn();

  beforeEach(() => {
    render(
      <MinutesContext.Provider
        value={[mockMinutesContextState, { updateMinutes: updateMinutesMock }]}
      >
        <ThemeProvider theme={theme}>
          <ColorPickerContainer />
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  });

  test("renders the primary color element", () => {
    const primaryColorBox = screen.getByText("Text color");
    expect(primaryColorBox).toBeDefined();
  });

  test("renders the secondary color element", () => {
    const secondaryColorBox = screen.getByText("Background color");
    expect(secondaryColorBox).toBeDefined();
  });

  test("color picker colors are equal to editor colors", () => {
    const colorPickerBoxes = screen.getAllByTestId("color-picker-box");
    const backgroundColor = window
      .getComputedStyle(colorPickerBoxes[0])
      .getPropertyValue("background-color");
    const rgbMatch = backgroundColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (rgbMatch) {
      const red = parseInt(rgbMatch[1], 10)
        .toString(16)
        .toUpperCase()
        .padStart(2, "0");
      const green = parseInt(rgbMatch[2], 10)
        .toString(16)
        .toUpperCase()
        .padStart(2, "0");
      const blue = parseInt(rgbMatch[3], 10)
        .toString(16)
        .toUpperCase()
        .padStart(2, "0");
      const actualHex = `#${red}${green}${blue}`;
      expect(actualHex).toBe(mockMinutesContextState.minutes.colors.primary);
    }
  });

  test("renders the restore defaults button", () => {
    const restoreButton = screen.getByText("Restore defaults", {
      selector: "button",
    });
    expect(restoreButton).toBeDefined();
  });
});
