import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import i18n from "../../i18n/config";
import MinutesContext from "../../contexts/MinutesContext";
import theme from "../../theme";
import SideBar from "./SideBar";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";
import { mockMinutesContextState } from "../../util/test.helpers";

describe("SideBar", () => {
  const updateMinutesMock = vi.fn();
  const clearSignaturesMock = vi.fn();

  const renderWith = (minutesMockState) => {
    render(
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
          <I18nextProvider i18n={i18n}>
            <SideBar />
          </I18nextProvider>
        </ThemeProvider>
      </MinutesContext.Provider>,
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

      test("renders the add signature field button", () => {
        const addSignatureFieldButton = screen.getByText(
          "Add Signature Field",
          { selector: "button" },
        );
        expect(addSignatureFieldButton).toBeDefined();
      });

      test("adds a new signature field on add signature field button click", () => {
        const addSignatureFieldButton = screen.getByText(
          "Add Signature Field",
          { selector: "button" },
        );
        fireEvent.click(addSignatureFieldButton);
        expect(updateMinutesMock).toHaveBeenCalledWith({
          signatures: expect.arrayContaining([
            expect.objectContaining({
              signer: "Test User",
              timestamp: "2024-03-30T00:00:00.000Z",
              image:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAB7CAYAAACb4F7QAAAAAXNSR0I",
            }),
            expect.objectContaining({
              signer: "",
              timestamp: null,
              image: null,
            }),
            expect.objectContaining({
              signer: "",
              timestamp: null,
              image: null,
            }),
          ]),
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
            segments: expect.arrayContaining([
              expect.objectContaining({
                name: "Agenda",
                content: "Some content",
              }),
              expect.objectContaining({
                name: "Decisions",
                content: "Some content",
              }),
              expect.objectContaining({
                name: "",
                content: "",
              }),
            ]),
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

      describe("with empty signatures", () => {
        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
          renderWith({
            ...mockMinutesContextState,
            minutes: {
              ...mockMinutesContextState.minutes,
              signatures: expect.arrayContaining([
                expect.objectContaining({
                  signer: "",
                  timestamp: null,
                  image: null,
                }),
              ]),
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
            segments: expect.arrayContaining([
              expect.objectContaining({
                name: "Agenda",
                content: "Some content",
              }),
              expect.objectContaining({
                name: "Decisions",
                content: "Some content",
              }),
              expect.objectContaining({
                name: "",
                content: "",
              }),
            ]),
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

    test("doesn't render the add signature field button", () => {
      const addSignatureFieldButton = screen.queryByText(
        "Add Signature Field",
        {
          selector: "button",
        },
      );
      expect(addSignatureFieldButton).not.toBeInTheDocument();
    });

    test("doesn't render add field button", () => {
      const addAFieldButton = screen.queryByText("Add a field", {
        selector: "button",
      });
      expect(addAFieldButton).not.toBeInTheDocument();
    });
  });
});
