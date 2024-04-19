import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { I18nextProvider } from "react-i18next";
import theme from "../../theme";
import i18n from "../../i18n/config";
import MinutesContext from "../../contexts/MinutesContext";
import EditorContext from "../../contexts/EditorContext";
import {
  mockMinutesContextState,
  mockEditorContextState,
} from "../../util/test.helpers";
import SignatureButtons from "./SignatureButtons";

describe("SignatureButtons", () => {
  const updateMinutesMock = vi.fn();
  const updateEditorMock = vi.fn();

  const renderWith = (signatureIndex) => {
    render(
      <MinutesContext.Provider
        value={[
          mockMinutesContextState,
          {
            updateMinutes: updateMinutesMock,
          },
        ]}
      >
        <EditorContext.Provider
          value={[mockEditorContextState, updateEditorMock]}
        >
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <SignatureButtons signatureIndex={signatureIndex} />
            </I18nextProvider>
          </ThemeProvider>
        </EditorContext.Provider>
      </MinutesContext.Provider>,
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("delete button", () => {
    describe("with signature that has content", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
        renderWith(0);
      });

      test("renders", () => {
        const deleteButton = screen.getByTestId("deleteButton");
        expect(deleteButton).toBeInTheDocument();
      });

      test("on delete confirmation confirm, deletes the signature field", async () => {
        window.confirm.mockReturnValue(true);

        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        await waitFor(() => {
          expect(window.confirm).toHaveBeenCalledOnce();
          expect(updateMinutesMock).toHaveBeenCalledOnce();
          expect(updateMinutesMock).toHaveBeenCalledWith({
            signatures: [
              {
                signer: "",
                timestamp: null,
                image: null,
              },
            ],
          });
        });
      });

      test("on delete confirmation cancel, doesnt call updateMinutes", async () => {
        window.confirm.mockReturnValue(false);

        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        await waitFor(() => {
          expect(window.confirm).toHaveBeenCalledOnce();
          expect(updateMinutesMock).not.toHaveBeenCalled();
        });
      });
    });

    describe("with an empty signature", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
        renderWith(1);
      });

      test("deletes the signature field and doesnt ask confirmation", () => {
        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        expect(window.confirm).not.toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalledWith({
          signatures: [
            {
              signer: "Test User",
              timestamp: "2024-03-30T00:00:00.000Z",
              image:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAB7CAYAAACb4F7QAAAAAXNSR0I",
            },
          ],
        });
      });
    });
  });

  describe("sign button", () => {
    beforeEach(() => {
      renderWith(0);
    });

    test("renders", () => {
      const signButton = screen.getByTestId("signButton");
      expect(signButton).toBeInTheDocument();
    });

    test("opens signatureModal with right index", () => {
      const signButton = screen.getByTestId("signButton");

      signButton.click();

      expect(updateEditorMock).toHaveBeenCalledOnce();
      expect(updateEditorMock).toHaveBeenCalledWith({
        isSignatureModalOpen: true,
        signatureIndex: 0,
      });
    });
  });
});
