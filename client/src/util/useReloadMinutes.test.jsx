import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import React from "react";
import {
  mockGetMinutesResponse,
  mockMinutesContextState,
} from "./test.helpers";
import minutesService from "../services/minutesService";
import useReloadMinutes from "./useReloadMinutes";
import i18n from "../i18n/config";
import MinutesContext from "../contexts/MinutesContext";

describe("useReloadMinutes", () => {
  const updateMinutesMock = vi.fn();
  const updateMetadataMock = vi.fn();
  const clearStateMock = vi.fn();

  const mockSuccessToast = vi.spyOn(toast, "success");
  const mockErrorToast = vi.spyOn(toast, "error");

  beforeEach(() => {
    vi.stubGlobal("confirm", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  const renderHookWith = (mockMinutesState) =>
    renderHook(() => useReloadMinutes(), {
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

    test("fetches minutes and gets confirmation from user if they have changed", async () => {
      const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
      mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);
      window.confirm.mockReturnValueOnce(true);

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockGetMinutes).toHaveBeenCalledOnce();
        expect(mockGetMinutes).toHaveBeenCalledWith(
          mockMinutesContextState.metadata.writeToken,
        );
        expect(window.confirm).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalledWith(
          mockGetMinutesResponse.data,
        );
        expect(updateMetadataMock).toHaveBeenCalledOnce();
        expect(updateMetadataMock).toHaveBeenCalledWith({
          writeAccess: true,
          readToken: mockGetMinutesResponse.readToken,
          writeToken: mockGetMinutesResponse.writeToken,
        });
        expect(mockSuccessToast).toHaveBeenCalledOnce();
        expect(mockSuccessToast).toHaveBeenCalledWith(
          "Successfully loaded minutes",
        );
      });
    });

    test("doesn't overwrite minutes when user declines confirmation", async () => {
      const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
      mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);
      window.confirm.mockReturnValueOnce(false);

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockGetMinutes).toHaveBeenCalledOnce();
        expect(mockGetMinutes).toHaveBeenCalledWith(
          mockMinutesContextState.metadata.writeToken,
        );
        expect(window.confirm).toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
        expect(updateMetadataMock).not.toHaveBeenCalled();
        expect(mockErrorToast).not.toHaveBeenCalled();
        expect(mockSuccessToast).not.toHaveBeenCalled();
      });
    });

    test("handles errors and notifies user", async () => {
      const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
      mockGetMinutes.mockRejectedValueOnce();

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockGetMinutes).toHaveBeenCalledOnce();
        expect(mockGetMinutes).toHaveBeenCalledWith(
          mockMinutesContextState.metadata.writeToken,
        );
        expect(window.confirm).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalledOnce();
        expect(updateMetadataMock).not.toHaveBeenCalled();
        expect(mockErrorToast).toHaveBeenCalledOnce();
        expect(mockErrorToast).toHaveBeenCalledWith("Reloading minutes failed");
      });
    });
  });

  describe("with saved minutes and no write access", () => {
    const mockMinutesState = {
      ...mockMinutesContextState,
      metadata: {
        ...mockMinutesContextState.metadata,
        writeAccess: false,
        writeToken: null,
      },
    };

    test("fetches minutes and gets confirmation from user if they have changed", async () => {
      const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
      mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);

      window.confirm.mockReturnValueOnce(true);

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockGetMinutes).toHaveBeenCalledOnce();
        expect(mockGetMinutes).toHaveBeenCalledWith(
          mockMinutesContextState.metadata.readToken,
        );
        expect(window.confirm).toHaveBeenCalled();
        expect(updateMinutesMock).toHaveBeenCalledOnce();
        expect(updateMinutesMock).toHaveBeenCalledWith(
          mockGetMinutesResponse.data,
        );
        expect(updateMetadataMock).toHaveBeenCalledOnce();
        expect(updateMetadataMock).toHaveBeenCalledWith({
          writeAccess: true,
          readToken: mockGetMinutesResponse.readToken,
          writeToken: mockGetMinutesResponse.writeToken,
        });
        expect(mockSuccessToast).toHaveBeenCalledOnce();
        expect(mockSuccessToast).toHaveBeenCalledWith(
          "Successfully loaded minutes",
        );
      });
    });

    test("doesn't overwrite minutes when user declines confirmation", async () => {
      const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
      mockGetMinutes.mockResolvedValueOnce(mockGetMinutesResponse);

      window.confirm.mockReturnValueOnce(false);

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockGetMinutes).toHaveBeenCalledOnce();
        expect(mockGetMinutes).toHaveBeenCalledWith(
          mockMinutesContextState.metadata.readToken,
        );
        expect(window.confirm).toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalled();
        expect(updateMetadataMock).not.toHaveBeenCalled();
        expect(mockErrorToast).not.toHaveBeenCalled();
        expect(mockSuccessToast).not.toHaveBeenCalled();
      });
    });

    test("handles errors and notifies user", async () => {
      const mockGetMinutes = vi.spyOn(minutesService, "getMinutesByToken");
      mockGetMinutes.mockRejectedValueOnce();

      await renderHookWith(mockMinutesState);

      await waitFor(() => {
        expect(mockGetMinutes).toHaveBeenCalledOnce();
        expect(mockGetMinutes).toHaveBeenCalledWith(
          mockMinutesContextState.metadata.readToken,
        );
        expect(window.confirm).not.toHaveBeenCalled();
        expect(updateMinutesMock).not.toHaveBeenCalledOnce();
        expect(updateMetadataMock).not.toHaveBeenCalled();
        expect(mockErrorToast).toHaveBeenCalledOnce();
        expect(mockErrorToast).toHaveBeenCalledWith("Reloading minutes failed");
      });
    });
  });
});
