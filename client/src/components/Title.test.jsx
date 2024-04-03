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

  const renderWith = (mockMinutesState) => {
    render(
      <MinutesContext.Provider
        value={[mockMinutesState, { updateMinutes: updateMinutesMock }]}
      >
        <ThemeProvider theme={theme}>
          <Title />
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  };

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  describe("with writeAccess", () => {
    beforeEach(() => {
      renderWith(mockMinutesContextState);
    });

    test("title input is NOT readonly", async () => {
      const titleInput = screen.getByPlaceholderText("Enter main title");
      expect(titleInput.attributes.readonly).toBeFalsy();
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
      const titleInput = screen.getByPlaceholderText("Enter main title");
      expect(titleInput).toBeInTheDocument();
    });

    test("title input is readonly", async () => {
      const titleInput = screen.getByPlaceholderText("Enter main title");
      expect(titleInput.attributes.readonly).toBeTruthy();
    });
  });
});
