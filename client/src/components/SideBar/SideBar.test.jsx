import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
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
  });
});
