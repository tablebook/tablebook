import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import SegmentButtons from "./SegmentButtons";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";
import { mockMinutesContextState } from "../../util/test.helpers";

describe("SegmentButtons", () => {
  const updateMinutesMock = vi.fn();
  const clearSignaturesMock = vi.fn();

  const renderWith = (segmentIndex, mockMinutesState) => {
    render(
      <MinutesContext.Provider
        value={[
          mockMinutesState,
          {
            updateMinutes: updateMinutesMock,
            clearSignatures: clearSignaturesMock,
          },
        ]}
      >
        <ThemeProvider theme={theme}>
          <SegmentButtons segmentIndex={segmentIndex} />
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  };

  const customSegments = [
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
  ];

  beforeEach(() => {
    renderHook(() => useHandleSignatureAffectingChange);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  describe("With signatures", () => {
    describe("Delete button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("renders", () => {
        const deleteButton = screen.getByTestId("deleteButton");
        expect(deleteButton).toBeInTheDocument();
      });

      test("on delete and signature check confirm, calls updateMinutes and clearSignatures", async () => {
        window.confirm.mockReturnValue(true);

        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        await waitFor(() => {
          expect(window.confirm).toHaveBeenCalledTimes(2);
          expect(clearSignaturesMock).toHaveBeenCalledOnce();
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

      test("on delete confirm and signature check cancel, doesnt call updateMinutes or clearSignatures", async () => {
        window.confirm.mockReturnValueOnce(true).mockReturnValueOnce(false);

        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        await waitFor(() => {
          expect(window.confirm).toHaveBeenCalledTimes(2);
          expect(clearSignaturesMock).not.toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalled();
        });
      });

      test("on delete cancel, doesnt call updateMinutes or clearSignatures", async () => {
        window.confirm.mockReturnValueOnce(false);

        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        await waitFor(() => {
          expect(window.confirm).toHaveBeenCalledOnce();
          expect(clearSignaturesMock).not.toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalled();
        });
      });
    });

    describe("Up button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("renders", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });
        const upButton = screen.getByTestId("upButton");
        expect(upButton).toBeInTheDocument();
      });

      test("on signature check confirm, calls the updateMinutes and clearSignatures", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });

        window.confirm.mockReturnValue(true);

        const upButton = screen.getByTestId("upButton");

        upButton.click();

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).toHaveBeenCalledOnce();
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

      test("on signature check cancel, doesnt call updateMinutes or clearSignatures", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });

        window.confirm.mockReturnValue(false);

        const upButton = screen.getByTestId("upButton");

        upButton.click();

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
      });

      test("doesnt call updateMinutes or clearSignatures when first segments button clicked", () => {
        renderWith(0, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });

        const upButton = screen.getByTestId("upButton");

        upButton.click();

        expect(window.confirm).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
      });
    });

    describe("Down button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("renders", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });
        const downButton = screen.getByTestId("downButton");
        expect(downButton).toBeInTheDocument();
      });

      test("on signature check confirm, calls the updateMinutes and clearSignatures", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });

        window.confirm.mockReturnValue(true);

        const downButton = screen.getByTestId("downButton");

        downButton.click();

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).toHaveBeenCalledOnce();
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

      test("on signature check cancel, doesnt call updateMinutes or clearSignatures", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });

        window.confirm.mockReturnValue(false);

        const downButton = screen.getByTestId("downButton");

        downButton.click();

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
      });

      test("doesnt call updateMinutes or clearSignatures when last segments button clicked", () => {
        renderWith(2, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
          },
        });

        const downButton = screen.getByTestId("downButton");

        downButton.click();

        expect(window.confirm).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("Without signatures", () => {
    describe("Delete button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
            signatures: [],
          },
        });
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("on delete confirm, calls updateMinutes and doesnt call clearSignatures", async () => {
        window.confirm.mockReturnValueOnce(true);

        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        await waitFor(() => {
          expect(window.confirm).toHaveBeenCalledOnce();
          expect(clearSignaturesMock).not.toHaveBeenCalled();
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

      test("on delete cancel, doesnt call updateMinutes or clearSignatures", async () => {
        window.confirm.mockReturnValueOnce(false);

        const deleteButton = screen.getByTestId("deleteButton");

        deleteButton.click();

        await waitFor(() => {
          expect(window.confirm).toHaveBeenCalledOnce();
          expect(clearSignaturesMock).not.toHaveBeenCalled();
          expect(updateMinutesMock).not.toHaveBeenCalled();
        });
      });
    });

    describe("Up button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("calls the updateMinutes and not clearSignatures", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
            signatures: [],
          },
        });

        const upButton = screen.getByTestId("upButton");

        upButton.click();

        expect(window.confirm).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
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

      test("doesnt call updateMinutes or clearSignatures when first segments button clicked", () => {
        renderWith(0, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
            signatures: [],
          },
        });

        const upButton = screen.getByTestId("upButton");

        upButton.click();

        expect(window.confirm).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
      });
    });

    describe("Down button", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("calls the updateMinutes and not clearSignatures", () => {
        renderWith(1, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
            signatures: [],
          },
        });

        const downButton = screen.getByTestId("downButton");

        downButton.click();

        expect(window.confirm).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
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

      test("doesnt call updateMinutes or clearSignatures when last segments button clicked", () => {
        renderWith(2, {
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            segments: customSegments,
            signatures: [],
          },
        });

        const downButton = screen.getByTestId("downButton");

        downButton.click();

        expect(window.confirm).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
      });
    });
  });
});
