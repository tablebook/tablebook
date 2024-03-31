import React from "react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import SideBar from "./SideBar";
import { mockMinutesContextState } from "../util/test.helpers";

describe("SideBar", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();

  beforeEach(() => {
    render(
      <EditorContext.Provider
        value={[
          {
            isSignatureModalOpen: false,
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
          <SideBar />
        </MinutesContext.Provider>
      </EditorContext.Provider>,
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
      expect(actualHex).toBe(mockMinutesContextState.minutes.colors.primary);
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

  describe("add a field button", () => {
    test("renders", () => {
      const addAFieldButton = screen.getByText("Add a field", {
        selector: "button",
      });
      expect(addAFieldButton).toBeDefined();
    });

    test("calls updateMinutes with right values", () => {
      const addAFieldButton = screen.getByText("Add a field", {
        selector: "button",
      });

      addAFieldButton.click();

      expect(updateMinutesMock).toHaveBeenCalledOnce();
      expect(updateMinutesMock).toHaveBeenCalledWith({
        segments: [
          {
            name: "Agenda",
            content: "Some content",
          },
          {
            name: "Decisions",
            content: "Some content",
          },
          {
            name: "",
            content: "",
          },
        ],
      });
    });
  });

  test("renders the sign button", () => {
    const signButton = screen.getByText("Sign", { selector: "button" });
    expect(signButton).toBeDefined();
  });

  test("handles updateEditor when the sign button is pressed", () => {
    const signButton = screen.getByText("Sign", { selector: "button" });
    fireEvent.click(signButton);
    expect(updateEditorMock).toHaveBeenCalledWith({
      isSignatureModalOpen: true,
    });
  });

  test("renders the preview button", () => {
    const previewButton = screen.getByText("Preview", { selector: "button" });
    expect(previewButton).toBeDefined();
  });
});
