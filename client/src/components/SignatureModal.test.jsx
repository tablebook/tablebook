import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import i18n from "../i18n/config";
import SignatureModal from "./SignatureModal";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import theme from "../theme";
import { mockMinutesContextState } from "../util/test.helpers";

describe("SignatureModal", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();

  const renderWith = (signatureIndex) => {
    render(
      <EditorContext.Provider
        value={[
          {
            isSignatureModalOpen: true,
            signatureIndex,
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
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <SignatureModal />
            </I18nextProvider>
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("", () => {
    beforeEach(() => {
      renderWith(0);
    });

    test("renders infography typography", () => {
      const infographyElement = screen.getByText("Draw your signature");
      expect(infographyElement).toBeDefined();
    });

    test("renders SignatureCanvas", () => {
      const canvasElement = document.querySelector("canvas");
      expect(canvasElement).toBeDefined();
    });

    test("renders signer input with correct placeholder", () => {
      const signerInput = screen.getByPlaceholderText(
        "Enter name clarification",
      );
      expect(signerInput).toBeInTheDocument();
    });

    test("renders checkbox", () => {
      const checkbox = screen.getByTestId("timestamp-checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    test("checkbox toggles state when clicked", () => {
      const checkbox = screen.getByTestId("timestamp-checkbox");
      expect(checkbox).toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    test("renders clear button", () => {
      const clearButton = screen.getByText("Clear", { selector: "button" });
      expect(clearButton).toBeDefined();
    });

    test("renders confirm button", () => {
      const confirmButton = screen.getByText("Confirm", { selector: "button" });
      expect(confirmButton).toBeDefined();
    });

    test("renders cancel button", () => {
      const cancelButton = screen.getByText("Cancel", { selector: "button" });
      expect(cancelButton).toBeDefined();
    });

    test("handles updateEditor when cancel button is clicked", () => {
      const cancelButton = screen.getByText("Cancel", { selector: "button" });
      fireEvent.click(cancelButton);
      expect(updateEditorMock).toHaveBeenCalledWith({
        isSignatureModalOpen: false,
      });
    });
  });

  describe("with signature that has content", () => {
    beforeEach(async () => {
      vi.stubGlobal("confirm", vi.fn());
      renderWith(0);
    });

    test("clicking confirm button and window confirm, generates null image, empty signer string and timestamp string", () => {
      window.confirm.mockReturnValueOnce(true);

      const confirmButton = screen.getByText("Confirm", { selector: "button" });
      fireEvent.click(confirmButton);

      expect(window.confirm).toHaveBeenCalledOnce();
      expect(updateMinutesMock).toHaveBeenCalled();
      expect(updateMinutesMock).toHaveBeenCalledWith({
        signatures: expect.arrayContaining([
          expect.objectContaining({
            signer: "",
            timestamp: expect.any(String),
            image: null,
          }),
          expect.objectContaining({
            signer: "",
            timestamp: null,
            image: null,
          }),
        ]),
      });
      expect(updateEditorMock).toHaveBeenCalledWith({
        isSignatureModalOpen: false,
      });
    });

    test("clicking confirm button and window cancel doesnt call updateMinutes", () => {
      window.confirm.mockReturnValueOnce(false);

      const confirmButton = screen.getByText("Confirm", { selector: "button" });
      fireEvent.click(confirmButton);

      expect(window.confirm).toHaveBeenCalledOnce();
      expect(updateMinutesMock).not.toHaveBeenCalled();
    });
  });

  describe("with empty signature", () => {
    beforeEach(async () => {
      vi.stubGlobal("confirm", vi.fn());
      renderWith(1);
    });

    test("clicking confirm button generates null image, empty signer string and timestamp string and doesnt call window confirm", () => {
      const confirmButton = screen.getByText("Confirm", { selector: "button" });
      fireEvent.click(confirmButton);

      expect(window.confirm).not.toHaveBeenCalled();
      expect(updateMinutesMock).toHaveBeenCalled();
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
            timestamp: expect.any(String),
            image: null,
          }),
        ]),
      });
      expect(updateEditorMock).toHaveBeenCalledWith({
        isSignatureModalOpen: false,
      });
    });
  });
});
