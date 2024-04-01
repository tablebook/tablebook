import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import SignatureModal from "./SignatureModal";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import theme from "../theme";
import { mockMinutesContextState } from "../util/test.helpers";

describe("SignatureModal", () => {
  const updateEditorMock = vi.fn();
  const updateMinutesMock = vi.fn();

  beforeEach(async () => {
    render(
      <EditorContext.Provider
        value={[
          {
            isSignatureModalOpen: true,
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
            <SignatureModal />
          </ThemeProvider>
        </MinutesContext.Provider>
      </EditorContext.Provider>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
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
    const signerInput = screen.getByPlaceholderText("Enter name clarification");
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

  test("clicking confirm button generates null image, empty signer string and timestamp string", () => {
    const confirmButton = screen.getByText("Confirm", { selector: "button" });
    fireEvent.click(confirmButton);
    expect(updateMinutesMock).toHaveBeenCalledWith({
      signatures: [
        {
          image: null,
          signer: "",
          timestamp: expect.any(String),
        },
      ],
    });
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
