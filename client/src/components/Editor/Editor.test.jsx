import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
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
  const renderWith = (mockMinutesState) => {
    render(
      <MinutesContext.Provider value={[mockMinutesState, {}]}>
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
  });
});
