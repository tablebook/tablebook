import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MinutesContext from "../contexts/MinutesContext";
import SideBar from "./SideBar";

describe("SideBar", () => {
  const mockedContext = {
    minutes: {
      name: "",
      colors: {
        primary: "#0000FF",
        secondary: "#FF00FF",
      },
    },
  };

  beforeEach(() => {
    render(
      <MinutesContext.Provider value={[mockedContext, {}]}>
        <SideBar />
      </MinutesContext.Provider>,
    );
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
      expect(actualHex).toBe(mockedContext.minutes.colors.primary);
    }
  });

  test("renders the primary color element", () => {
    const primaryColorBox = screen.getByText("Text color");
    expect(primaryColorBox).toBeDefined();
  });

  test("renders the secondary color element", () => {
    const secondaryColorBox = screen.getByText("Background color");
    expect(secondaryColorBox).toBeDefined();
  });

  test("renders the restore defaults button", () => {
    const restoreButton = screen.getByText("Restore defaults", {
      selector: "button",
    });
    expect(restoreButton).toBeDefined();
  });

  test("render the flag trigger button", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    expect(flagTrigger).toBeInTheDocument();
  });

  test("open flag picker on click of flag tigger button and close on reclick", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    fireEvent.click(flagTrigger);
    const flagPicker = screen.getByTestId("flagPicker");
    expect(flagPicker).toBeInTheDocument();
    fireEvent.click(flagTrigger);
    expect(flagPicker).not.toBeInTheDocument();
  });

  test("renders the add a field button", () => {
    const addAFieldButton = screen.getByText("Add a field", {
      selector: "button",
    });
    expect(addAFieldButton).toBeDefined();
  });

  test("renders the sign button", () => {
    const signButton = screen.getByText("Sign", { selector: "button" });
    expect(signButton).toBeDefined();
  });

  test("renders the preview button", () => {
    const previewButton = screen.getByText("Preview", { selector: "button" });
    expect(previewButton).toBeDefined();
  });
});
