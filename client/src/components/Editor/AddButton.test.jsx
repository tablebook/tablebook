import React from "react";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import theme from "../../theme";
import AddButton from "./AddButton";

describe("AddButton", () => {
  const mockHandleOnClick = vi.fn();

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <AddButton onClick={mockHandleOnClick}>Button text</AddButton>
      </ThemeProvider>,
    );
  });

  test("should render text", () => {
    const textElement = screen.getByText("Button text");
    expect(textElement).toBeDefined();
  });

  test("should call onClick on click", () => {
    const textElement = screen.getByText("Button text");
    textElement.click();
    expect(mockHandleOnClick).toHaveBeenCalledOnce();
  });

  test("should render AddCircleIcon", () => {
    const iconElement = screen.getByTestId("AddCircleIcon");
    expect(iconElement).toBeDefined();
  });
});
