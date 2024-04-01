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
