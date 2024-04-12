import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import MinutesContext from "../../contexts/MinutesContext";
import EditorContext from "../../contexts/EditorContext";
import theme from "../../theme";
import SideBar from "./SideBar";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";
import { mockMinutesContextState } from "../../util/test.helpers";

describe("SideBar", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();
  const clearSignaturesMock = vi.fn();

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
          value={[
            minutesMockState,
            {
              updateMinutes: updateMinutesMock,
              clearSignatures: clearSignaturesMock,
            },
          ]}
        >
          <ThemeProvider theme={theme}>
            <SideBar />
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
  };

  beforeEach(() => {
    renderHook(() => useHandleSignatureAffectingChange);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  describe("with writeAccess", () => {
    describe("", () => {
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

    describe("add a field button", () => {
      test("renders", () => {
        renderWith(mockMinutesContextState);
        const addAFieldButton = screen.getByText("Add a field", {
          selector: "button",
        });
        expect(addAFieldButton).toBeDefined();
      });

      describe("with signatures", () => {
        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
          renderWith(mockMinutesContextState);
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("on signature check confirm, calls updateMinutes with right values and calls clearSignatures", () => {
          const addAFieldButton = screen.getByText("Add a field", {
            selector: "button",
          });

          window.confirm.mockReturnValue(true);

          addAFieldButton.click();

          expect(window.confirm).toHaveBeenCalledOnce();
          expect(clearSignaturesMock).toHaveBeenCalledOnce();
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

        test("on signature check cancel, doesnt call updateMinutes or clearSignatures", () => {
          const addAFieldButton = screen.getByText("Add a field", {
            selector: "button",
          });

          window.confirm.mockReturnValue(false);

          addAFieldButton.click();

          expect(window.confirm).toHaveBeenCalledOnce();
          expect(clearSignaturesMock).not.toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalled();
        });
      });

      describe("without signatures", () => {
        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
          renderWith({
            ...mockMinutesContextState,
            minutes: {
              ...mockMinutesContextState.minutes,
              signatures: [],
            },
          });
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("calls updateMinutes with right values and doesnt call clearSignatures", () => {
          const addAFieldButton = screen.getByText("Add a field", {
            selector: "button",
          });

          addAFieldButton.click();

          expect(window.confirm).not.toHaveBeenCalled();
          expect(clearSignaturesMock).not.toHaveBeenCalled();
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
