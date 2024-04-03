import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Title from "./Title";
import MinutesContext from "../contexts/MinutesContext";
import theme from "../theme";
import { mockMinutesContextState } from "../util/test.helpers";

describe("Title", () => {
  const updateMinutesMock = vi.fn();

  beforeEach(() => {
    render(
      <MinutesContext.Provider
        value={[mockMinutesContextState, { updateMinutes: updateMinutesMock }]}
      >
        <ThemeProvider theme={theme}>
          <Title />
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  test("renders title input with correct placeholder", () => {
    const titleInput = screen.getByPlaceholderText("Enter main title");
    expect(titleInput).toBeInTheDocument();
  });

  test("changing the title calls updateMinutes", async () => {
    const titleInput = screen.getByPlaceholderText("Enter main title");
    fireEvent.change(titleInput, { target: { value: "new" } });
    expect(updateMinutesMock).toHaveBeenCalled();
    expect(updateMinutesMock).toHaveBeenCalledWith({ name: "new" });
  });
});
