import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ColorPicker from "./ColorPicker";

describe("ColorPicker", () => {
  beforeEach(() => {
    render(<ColorPicker />);
  });

  test("renders the small color picker boxes", () => {
    const colorPickerBox = screen.getByTestId("color-picker-box");
    expect(colorPickerBox).toBeInTheDocument();
  });

  test("shows color picker panel when clicked and hides when clicked outside", () => {
    const colorPickerBox = screen.getByTestId("color-picker-box");
    fireEvent.click(colorPickerBox);
    const colorPickerPanel = screen.getByTestId("color-picker");
    expect(colorPickerPanel).toBeInTheDocument();
    fireEvent.click(colorPickerBox);
    expect(colorPickerPanel).not.toBeInTheDocument();
  });
});
