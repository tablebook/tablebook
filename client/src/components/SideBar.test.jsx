import React from "react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import theme from "../theme";
import SideBar from "./SideBar";
import { mockMinutesContextState } from "../util/test.helpers";

describe("SideBar", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();

  const renderWith = (minutesMockState) => {
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
          value={[minutesMockState, { updateMinutes: updateMinutesMock }]}
        >
          <ThemeProvider theme={theme}>
            <SideBar />
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
  };

  describe("with writeAccess", () => {
    beforeEach(() => {
      renderWith(mockMinutesContextState);
    });
    test("renders ColorPickerContainer", () => {
      const colorPickerContainer = screen.getByTestId("colorPickerContainer");
      expect(colorPickerContainer).toBeDefined();
    });

    test("renders LanguagePickerContainer", () => {
      const languagePickerContainer = screen.getByTestId("flagTrigger");
      expect(languagePickerContainer).toBeDefined();
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
  });

  describe("without writeAccess", () => {
    beforeEach(() => {
      renderWith({
        ...mockMinutesContextState,
        metadata: {
          ...mockMinutesContextState.metadata,
          writeAccess: false,
          writeToken: null,
        },
      });
    });

    test("doesn't render ColorPickerContainer", () => {
      const colorPickerContainer = screen.queryByTestId("colorPickerContainer");
      expect(colorPickerContainer).not.toBeInTheDocument();
    });

    test("renders LanguagePickerContainer", () => {
      const languagePickerContainer = screen.getByTestId("flagTrigger");
      expect(languagePickerContainer).toBeDefined();
    });

    test("doesn't render the sign button", () => {
      const signButton = screen.queryByText("Sign", { selector: "button" });
      expect(signButton).not.toBeInTheDocument();
    });

    test("doesn't render add field button", () => {
      const addAFieldButton = screen.queryByText("Add a field", {
        selector: "button",
      });
      expect(addAFieldButton).not.toBeInTheDocument();
    });
  });
});
