import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { I18nextProvider } from "react-i18next";
import Editor from "./Editor";
import i18n from "../../i18n/config";
import MinutesContext from "../../contexts/MinutesContext";
import EditorContext from "../../contexts/EditorContext";
import theme from "../../theme";
import {
  mockMinutesContextState,
  mockEditorContextState,
} from "../../util/test.helpers";

describe("Editor", () => {
  const updateMinutesMock = vi.fn();
  const clearSignaturesMock = vi.fn();

  const renderWith = (mockMinutesState) => {
    render(
      <MinutesContext.Provider
        value={[
          mockMinutesState,
          {
            updateMinutes: updateMinutesMock,
            clearSignatures: clearSignaturesMock,
          },
        ]}
      >
        <EditorContext.Provider value={[mockEditorContextState]}>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <Editor />
            </I18nextProvider>
          </ThemeProvider>
        </EditorContext.Provider>
      </MinutesContext.Provider>,
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("with writeAccess", () => {
    beforeEach(() => {
      renderWith(mockMinutesContextState);
    });
    test("renders title component", () => {
      const titleComponent = screen.getByTestId("title-component");
      expect(titleComponent).toBeDefined();
    });

    test("renders the right amount of segment components", () => {
      const segmentComponents = screen.getAllByTestId("segment-component");
      expect(segmentComponents.length).toBe(
        mockMinutesContextState.minutes.segments.length,
      );
    });

    test("renders the right amount of segmentButton components", () => {
      const segmentButtonComponents = screen.getAllByTestId("segment-buttons");
      expect(segmentButtonComponents.length).toBe(
        mockMinutesContextState.minutes.segments.length,
      );
    });

    test("renders the right amount of signature components", () => {
      const signatureComponents = screen.getAllByTestId("signature-component");
      expect(signatureComponents.length).toBe(
        mockMinutesContextState.minutes.signatures.length,
      );
    });

    test("renders the right amount of signatureButton components", () => {
      const signatureButtonComponents =
        screen.getAllByTestId("signature-buttons");

      expect(signatureButtonComponents.length).toBe(
        mockMinutesContextState.minutes.signatures.length,
      );
    });

    describe("add field button", () => {
      test("renders", () => {
        const addAFieldButton = screen.getByText("Add field");
        expect(addAFieldButton).toBeDefined();
      });

      describe("with signatures", () => {
        beforeEach(() => {
          vi.stubGlobal("confirm", vi.fn());
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("on signature check confirm, calls updateMinutes with right values and calls clearSignatures", () => {
          const addAFieldButton = screen.getByText("Add field");

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
          const addAFieldButton = screen.getByText("Add field");

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
          cleanup();
          renderWith({
            ...mockMinutesContextState,
            minutes: {
              ...mockMinutesContextState.minutes,
              signatures: [
                {
                  id: "testid",
                  signer: "",
                  timestamp: null,
                  image: null,
                },
              ],
            },
          });
        });

        afterEach(() => {
          vi.unstubAllGlobals();
        });

        test("calls updateMinutes with right values and doesn't call clearSignatures", () => {
          const addAFieldButton = screen.getByText("Add field");

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

    describe("add signature button", () => {
      test("renders", () => {
        const addSignatureFieldButton = screen.getByText("Add signature field");
        expect(addSignatureFieldButton).toBeDefined();
      });

      test("adds a new signature field", () => {
        const addSignatureFieldButton = screen.getByText("Add signature field");
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

    test("doesn't render any segmentButton components", () => {
      const segmentButtonComponents =
        screen.queryAllByTestId("segment-buttons");
      expect(segmentButtonComponents.length).toBe(0);
    });

    test("doesn't render any signatureButton components", () => {
      const signatureButtonComponents =
        screen.queryAllByTestId("signature-buttons");
      expect(signatureButtonComponents.length).toBe(0);
    });

    test("doesn't render the add signature field button", () => {
      const addSignatureFieldButton = screen.queryByText("Add signature field");
      expect(addSignatureFieldButton).not.toBeInTheDocument();
    });

    test("doesn't render add field button", () => {
      const addAFieldButton = screen.queryByText("Add field");
      expect(addAFieldButton).not.toBeInTheDocument();
    });
  });
});
