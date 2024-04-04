import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Segment from "./Segment";
import MinutesContext from "../contexts/MinutesContext";
import { mockMinutesContextState } from "../util/test.helpers";

describe("Segment", () => {
  const updateMinutesMock = vi.fn();

  const renderWith = (mockMinutesState) => {
    render(
      <MinutesContext.Provider
        value={[mockMinutesState, { updateMinutes: updateMinutesMock }]}
      >
        <ThemeProvider theme={theme}>
          <Segment segmentIndex={0} />
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

    test("renders content title input", () => {
      const contentTitleInput = screen.getByPlaceholderText("Enter the title");
      expect(contentTitleInput).toBeInTheDocument();
    });

    test("renders content input", () => {
      const contentInput = screen.getByPlaceholderText("Enter the content");
      expect(contentInput).toBeInTheDocument();
    });

    test("segment title is NOT readonly", () => {
      const contentTitleInput = screen.getByPlaceholderText("Enter the title");
      expect(contentTitleInput.attributes.readonly).toBeFalsy();
    });

    test("segment content is NOT readonly", () => {
      const contentInput = screen.getByPlaceholderText("Enter the content");
      expect(contentInput.attributes.readonly).toBeFalsy();
    });

    test("title has the correct value", () => {
      const contentTitleInput = screen.getByPlaceholderText("Enter the title");
      expect(contentTitleInput.value).toBe("Agenda");
    });

    test("content has the correct value", () => {
      const contentTitleInput =
        screen.getByPlaceholderText("Enter the content");
      expect(contentTitleInput.value).toBe("Some content");
    });

    test("changing the title calls updateMinutes", async () => {
      const contentTitleInput = screen.getByPlaceholderText("Enter the title");
      fireEvent.change(contentTitleInput, { target: { value: "new" } });
      expect(updateMinutesMock).toHaveBeenCalled();
      expect(updateMinutesMock).toHaveBeenCalledWith({
        segments: [
          {
            name: "new",
            content: "Some content",
          },
          {
            name: "Decisions",
            content: "Some content",
          },
        ],
      });
    });

    test("changing the content calls updateMinutes", async () => {
      const contentInput = screen.getByPlaceholderText("Enter the content");
      fireEvent.change(contentInput, { target: { value: "new" } });
      expect(updateMinutesMock).toHaveBeenCalled();
      expect(updateMinutesMock).toHaveBeenCalledWith({
        segments: [
          {
            name: "Agenda",
            content: "new",
          },
          {
            name: "Decisions",
            content: "Some content",
          },
        ],
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

    test("renders content title input", () => {
      const contentTitleInput = screen.getByPlaceholderText("Enter the title");
      expect(contentTitleInput).toBeInTheDocument();
    });

    test("renders content input", () => {
      const contentInput = screen.getByPlaceholderText("Enter the content");
      expect(contentInput).toBeInTheDocument();
    });

    test("segment title is readonly", () => {
      const contentTitleInput = screen.getByPlaceholderText("Enter the title");
      expect(contentTitleInput.attributes.readonly).toBeTruthy();
    });

    test("segment content is readonly", () => {
      const contentInput = screen.getByPlaceholderText("Enter the content");
      expect(contentInput.attributes.readonly).toBeTruthy();
    });

    test("title has the correct value", () => {
      const contentTitleInput = screen.getByPlaceholderText("Enter the title");
      expect(contentTitleInput.value).toBe("Agenda");
    });

    test("content has the correct value", () => {
      const contentTitleInput =
        screen.getByPlaceholderText("Enter the content");
      expect(contentTitleInput.value).toBe("Some content");
    });
  });
});
