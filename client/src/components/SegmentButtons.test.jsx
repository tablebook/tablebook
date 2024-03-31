import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SegmentButtons from "./SegmentButtons";
import MinutesContext from "../contexts/MinutesContext";
import { mockMinutesContextState } from "../util/test.helpers";

describe("EditorButtons", () => {
  const updateMinutesMock = vi.fn();

  const editedMockMinutesContextState = {
    minutes: {
      ...mockMinutesContextState.minutes,
      segments: [
        {
          name: "0 title",
          content: "0 content",
        },
        {
          name: "1 title",
          content: "1 content",
        },
        {
          name: "2 title",
          content: "2 content",
        },
      ],
    },
    metadata: mockMinutesContextState.metadata,
  };

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  describe("Delete button", () => {
    beforeEach(() => {
      vi.stubGlobal("confirm", vi.fn());

      render(
        <MinutesContext.Provider
          value={[
            editedMockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <SegmentButtons segmentIndex={1} />
        </MinutesContext.Provider>,
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    test("renders", () => {
      const deleteButton = screen.getByTestId("deleteButton");
      expect(deleteButton).toBeInTheDocument();
    });

    test("on confirm, calls updateMinutes with right values", async () => {
      window.confirm.mockReturnValueOnce(true);

      const deleteButton = screen.getByTestId("deleteButton");

      deleteButton.click();

      await waitFor(() => {
        expect(window.confirm).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalledWith({
          segments: [
            {
              name: "0 title",
              content: "0 content",
            },
            {
              name: "2 title",
              content: "2 content",
            },
          ],
        });
      });
    });

    test("on cancel, doent call updateMinutes", async () => {
      window.confirm.mockReturnValueOnce(false);

      const deleteButton = screen.getByTestId("deleteButton");

      deleteButton.click();

      await waitFor(() => {
        expect(window.confirm).toHaveBeenCalledOnce();
        expect(updateMinutesMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("Up button", () => {
    test("renders", () => {
      render(
        <MinutesContext.Provider
          value={[
            editedMockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <SegmentButtons segmentIndex={1} />
        </MinutesContext.Provider>,
      );

      const upButton = screen.getByTestId("upButton");
      expect(upButton).toBeInTheDocument();
    });

    test("calls the updateMinutes with right values", () => {
      render(
        <MinutesContext.Provider
          value={[
            editedMockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <SegmentButtons segmentIndex={1} />
        </MinutesContext.Provider>,
      );

      const upButton = screen.getByTestId("upButton");

      upButton.click();

      expect(updateMinutesMock).toHaveBeenCalledOnce();
      expect(updateMinutesMock).toHaveBeenCalledWith({
        segments: [
          {
            name: "1 title",
            content: "1 content",
          },
          {
            name: "0 title",
            content: "0 content",
          },
          {
            name: "2 title",
            content: "2 content",
          },
        ],
      });
    });

    test("doesnt call updateMinutes when first segments button clicked", () => {
      render(
        <MinutesContext.Provider
          value={[
            editedMockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <SegmentButtons segmentIndex={0} />
        </MinutesContext.Provider>,
      );

      const upButton = screen.getByTestId("upButton");

      upButton.click();

      expect(updateMinutesMock).not.toHaveBeenCalled();
    });
  });

  describe("Down button", () => {
    test("renders", () => {
      render(
        <MinutesContext.Provider
          value={[
            editedMockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <SegmentButtons segmentIndex={1} />
        </MinutesContext.Provider>,
      );

      const downButton = screen.getByTestId("downButton");
      expect(downButton).toBeInTheDocument();
    });

    test("calls the updateMinutes with right values", () => {
      render(
        <MinutesContext.Provider
          value={[
            editedMockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <SegmentButtons segmentIndex={1} />
        </MinutesContext.Provider>,
      );

      const downButton = screen.getByTestId("downButton");

      downButton.click();

      expect(updateMinutesMock).toHaveBeenCalledOnce();
      expect(updateMinutesMock).toHaveBeenCalledWith({
        segments: [
          {
            name: "0 title",
            content: "0 content",
          },
          {
            name: "2 title",
            content: "2 content",
          },
          {
            name: "1 title",
            content: "1 content",
          },
        ],
      });
    });

    test("doesnt call updateMinutes when last segments button clicked", () => {
      render(
        <MinutesContext.Provider
          value={[
            editedMockMinutesContextState,
            { updateMinutes: updateMinutesMock },
          ]}
        >
          <SegmentButtons segmentIndex={2} />
        </MinutesContext.Provider>,
      );

      const downButton = screen.getByTestId("downButton");

      downButton.click();

      expect(updateMinutesMock).not.toHaveBeenCalled();
    });
  });
});
