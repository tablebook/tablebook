import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/config";
import Title from "./Title";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";
import theme from "../../theme";
import { mockMinutesContextState } from "../../util/test.helpers";

describe("Title", () => {
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
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <Title />
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

      test("title input is NOT readonly", async () => {
        const titleInput = screen.getByPlaceholderText("Enter the main title");
        expect(titleInput.attributes.readonly).toBeFalsy();
      });

      test("renders title input with correct placeholder", () => {
        const titleInput = screen.getByPlaceholderText("Enter the main title");
        expect(titleInput).toBeInTheDocument();
      });
    });

    describe("with signatures", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
        renderWith(mockMinutesContextState);
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("on signature check confirm, changing the title calls updateMinutes and clearSignatures", async () => {
        const titleInput = screen.getByPlaceholderText("Enter the main title");

        window.confirm.mockReturnValue(true);

        fireEvent.change(titleInput, { target: { value: "new" } });

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledWith({ name: "new" });
      });

      test("on signature check cancel, changing the title doesnt call updateMinutes or clearSignatures", async () => {
        const titleInput = screen.getByPlaceholderText("Enter the main title");

        window.confirm.mockReturnValue(false);

        fireEvent.change(titleInput, { target: { value: "new" } });

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
            signatures: [
              {
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

      test("changing the title calls updateMinutes and not clearSignatures", async () => {
        const titleInput = screen.getByPlaceholderText("Enter the main title");

        fireEvent.change(titleInput, { target: { value: "new" } });

        expect(window.confirm).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledWith({ name: "new" });
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

    test("renders title input with correct placeholder", () => {
      const titleInput = screen.getByPlaceholderText("Enter the main title");
      expect(titleInput).toBeInTheDocument();
    });

    test("title input is readonly", async () => {
      const titleInput = screen.getByPlaceholderText("Enter the main title");
      expect(titleInput.attributes.readonly).toBeTruthy();
    });
  });
});
