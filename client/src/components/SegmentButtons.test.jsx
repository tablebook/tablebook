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

  const renderFirst = () => {
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
  };

  const renderSecond = () => {
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
  };

  const renderLast = () => {
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
  };

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  describe("Delete button", () => {
    beforeEach(() => {
      vi.stubGlobal("confirm", vi.fn());
      renderSecond();
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
      renderSecond();
      const upButton = screen.getByTestId("upButton");
      expect(upButton).toBeInTheDocument();
    });

    test("calls the updateMinutes with right values", () => {
      renderSecond();

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
      renderFirst();

      const upButton = screen.getByTestId("upButton");

      upButton.click();

      expect(updateMinutesMock).not.toHaveBeenCalled();
    });
  });

  describe("Down button", () => {
    test("renders", () => {
      renderSecond();
      const downButton = screen.getByTestId("downButton");
      expect(downButton).toBeInTheDocument();
    });

    test("calls the updateMinutes with right values", () => {
      renderSecond();

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
      renderLast();

      const downButton = screen.getByTestId("downButton");

      downButton.click();

      expect(updateMinutesMock).not.toHaveBeenCalled();
    });
  });
});
