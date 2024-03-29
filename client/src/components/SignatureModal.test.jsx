import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import SignatureModal from "./SignatureModal";
import MinutesContext from "../contexts/MinutesContext";
import theme from "../theme";

describe("SignatureModal", () => {
  const onCloseMock = vi.fn();
  const updateMinutesMock = vi.fn();

  beforeEach(async () => {
    render(
      <MinutesContext.Provider
        value={[{}, { updateMinutes: updateMinutesMock }]}
      >
        <ThemeProvider theme={theme}>
          <SignatureModal open onClose={onCloseMock} />
        </ThemeProvider>
      </MinutesContext.Provider>,
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

  test("renders clear button", () => {
    const clearButton = screen.getByText("Clear", { selector: "button" });
    expect(clearButton).toBeDefined();
  });

  test("renders confirm button", () => {
    const confirmButton = screen.getByText("Confirm", { selector: "button" });
    expect(confirmButton).toBeDefined();
  });

  test("clicking confirm button generates imageURL", () => {
    const confirmButton = screen.getByText("Confirm", { selector: "button" });
    fireEvent.click(confirmButton);
    expect(updateMinutesMock).toHaveBeenCalledWith({
      signatures: [
        { image: expect.stringMatching(/^data:image\/png;base64,/) },
      ],
    });
  });

  test("renders cancel button", () => {
    const cancelButton = screen.getByText("Cancel", { selector: "button" });
    expect(cancelButton).toBeDefined();
  });

  test("calls onClose when cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel", { selector: "button" });
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledOnce();
  });
});
