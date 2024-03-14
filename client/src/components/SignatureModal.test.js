import { expect, test, describe, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import SignatureModal from "./SignatureModal.jsx";

import theme from "../theme";

describe("SignatureModal", () => {
  let onSaveMock;
  let onCloseMock;

  beforeEach(async () => {
    onSaveMock = vi.fn();
    onCloseMock = vi.fn();
    render(
      <ThemeProvider theme={theme}>
        <SignatureModal open={true} onClose={onCloseMock} onSave={onSaveMock} />
      </ThemeProvider>,
    );
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

  test("calls onSave and returns imageURL when confirm button is clicked", () => {
    const confirmButton = screen.getByText("Confirm", { selector: "button" });
    fireEvent.click(confirmButton);
    expect(onSaveMock).toHaveBeenCalled();
    expect(onSaveMock.mock.calls[0][0]).toMatch(/^data:image\/png;base64,/);
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
