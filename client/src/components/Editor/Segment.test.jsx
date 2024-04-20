import React from "react";
import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import i18n from "../../i18n/config";
import theme from "../../theme";
import Segment from "./Segment";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";
import { mockMinutesContextState } from "../../util/test.helpers";

describe("Segment", () => {
  const updateMinutesMock = vi.fn();
  const clearSignaturesMock = vi.fn();

  const renderWith = (mockMinutesState) => {
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
          <I18nextProvider i18n={i18n}>
            <Segment segmentIndex={0} />
          </I18nextProvider>
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  };

  beforeEach(() => {
    renderHook(() => useHandleSignatureAffectingChange);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  describe("with writeAccess", () => {
    describe("", () => {
      beforeEach(() => {
        renderWith(mockMinutesContextState);
      });

      test("renders content title input", () => {
        const contentTitleInput =
          screen.getByPlaceholderText("Enter the title");
        expect(contentTitleInput).toBeInTheDocument();
      });

      test("renders content input", () => {
        const contentInput = screen.getByPlaceholderText("Enter the content");
        expect(contentInput).toBeInTheDocument();
      });

      test("segment title is NOT readonly", () => {
        const contentTitleInput =
          screen.getByPlaceholderText("Enter the title");
        expect(contentTitleInput.attributes.readonly).toBeFalsy();
      });

      test("segment content is NOT readonly", () => {
        const contentInput = screen.getByPlaceholderText("Enter the content");
        expect(contentInput.attributes.readonly).toBeFalsy();
      });

      test("title has the correct value", () => {
        const contentTitleInput =
          screen.getByPlaceholderText("Enter the title");
        expect(contentTitleInput.value).toBe("Agenda");
      });

      test("content has the correct value", () => {
        const contentTitleInput =
          screen.getByPlaceholderText("Enter the content");
        expect(contentTitleInput.value).toBe("Some content");
      });
    });

    describe("with signatures", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
        renderWith(mockMinutesContextState);
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("on signature check confirm, changing the title calls updateMinutes and clearSignatures", async () => {
        const contentTitleInput =
          screen.getByPlaceholderText("Enter the title");

        window.confirm.mockReturnValue(true);

        fireEvent.change(contentTitleInput, { target: { value: "new" } });

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledWith({
          segments: expect.arrayContaining([
            expect.objectContaining({
              name: "new",
              content: "Some content",
            }),
            expect.objectContaining({
              name: "Decisions",
              content: "Some content",
            }),
          ]),
        });
      });

      test("on signature check cancel, changing the title doesnt call updateMinutes or clearSignatures", async () => {
        const contentTitleInput =
          screen.getByPlaceholderText("Enter the title");

        window.confirm.mockReturnValue(false);

        fireEvent.change(contentTitleInput, { target: { value: "new" } });

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
      });

      test("on signature check confirm, changing the content calls updateMinutes and clearSignatures", async () => {
        const contentInput = screen.getByPlaceholderText("Enter the content");

        window.confirm.mockReturnValue(true);

        fireEvent.change(contentInput, { target: { value: "new" } });

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledWith({
          segments: expect.arrayContaining([
            expect.objectContaining({
              name: "Agenda",
              content: "new",
            }),
            expect.objectContaining({
              name: "Decisions",
              content: "Some content",
            }),
          ]),
        });
      });

      test("on signature check cancel, changing the content doesnt call updateMinutes or clearSignatures", async () => {
        const contentInput = screen.getByPlaceholderText("Enter the content");

        window.confirm.mockReturnValue(false);

        fireEvent.change(contentInput, { target: { value: "new" } });

        expect(window.confirm).toHaveBeenCalledOnce();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
      });
    });

    describe("with empty signatures", () => {
      beforeEach(() => {
        vi.stubGlobal("confirm", vi.fn());
        renderWith({
          ...mockMinutesContextState,
          minutes: {
            ...mockMinutesContextState.minutes,
            signatures: [
              {
                signer: "",
                timestamp: null,
                image: null,
              },
            ],
          },
        });
      });

      afterEach(() => {
        vi.unstubAllGlobals();
      });

      test("changing the title calls updateMinutes and not clearSignatures", async () => {
        const contentTitleInput =
          screen.getByPlaceholderText("Enter the title");

        fireEvent.change(contentTitleInput, { target: { value: "new" } });

        expect(window.confirm).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledWith({
          segments: expect.arrayContaining([
            expect.objectContaining({
              name: "new",
              content: "Some content",
            }),
            expect.objectContaining({
              name: "Decisions",
              content: "Some content",
            }),
          ]),
        });
      });

      test("changing the content calls updateMinutes and not clearSignatures", async () => {
        const contentInput = screen.getByPlaceholderText("Enter the content");

        fireEvent.change(contentInput, { target: { value: "new" } });

        expect(window.confirm).not.toHaveBeenCalled();
        expect(clearSignaturesMock).not.toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledWith({
          segments: expect.arrayContaining([
            expect.objectContaining({
              name: "Agenda",
              content: "new",
            }),
            expect.objectContaining({
              name: "Decisions",
              content: "Some content",
            }),
          ]),
        });
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
