import { expect, test, describe, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import React from "react";
import {
  mockMinutesContextState,
  mockPostMinutesResponse,
} from "./test.helpers";
import i18n from "../i18n/config";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";
import useSaveMinutes from "./useSaveMinutes";

describe("useSaveMinutes", () => {
  const updateMinutesMock = vi.fn();
  const updateMetadataMock = vi.fn();
  const clearStateMock = vi.fn();

  const mockSuccessToast = vi.spyOn(toast, "success");
  const mockErrorToast = vi.spyOn(toast, "error");

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderHookWith = (mockMinutesState) =>
    renderHook(() => useSaveMinutes(), {
      wrapper: ({ children }) => (
        <MinutesContext.Provider
          value={[
            mockMinutesState,
            {
              updateMinutes: updateMinutesMock,
              updateMetadata: updateMetadataMock,
              clearState: clearStateMock,
            },
          ]}
        >
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </MinutesContext.Provider>
      ),
    }).result.current();

  describe("with saved minutes and write access", () => {
    const mockMinutesState = mockMinutesContextState;

    test("calls minutesService and notifies user when successful", async () => {
      const mockUpdateMinutes = vi.spyOn(
        minutesService,
        "updateMinutesByToken",
      );
      mockUpdateMinutes.mockResolvedValueOnce(mockPostMinutesResponse);

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockUpdateMinutes).toHaveBeenCalledOnce();
        expect(mockUpdateMinutes).toHaveBeenCalledWith(
          mockMinutesContextState.metadata.writeToken,
          mockMinutesContextState.minutes,
        );
        expect(mockSuccessToast).toHaveBeenCalledOnce();
        expect(mockSuccessToast).toHaveBeenCalledWith(
          "Minutes saved successfully!",
        );
      });
    });

    test("calls minutesService and notifies user when service throws error", async () => {
      const mockUpdateMinutes = vi.spyOn(
        minutesService,
        "updateMinutesByToken",
      );
      mockUpdateMinutes.mockRejectedValueOnce();

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockUpdateMinutes).toHaveBeenCalledOnce();
        expect(mockErrorToast).toHaveBeenCalledOnce();
        expect(mockErrorToast).toHaveBeenCalledWith("Saving minutes failed");
      });
    });
  });
});
