import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { afterEach, describe, test, vi, expect } from "vitest";
import { ThemeProvider } from "@mui/material";
import { toast } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import MinutesContext from "../contexts/MinutesContext";
import {
  mockGetMinutesResponse,
  mockMinutesContextState,
} from "../util/test.helpers";
import theme from "../theme";
import LoadingPage from "./LoadingPage";
import logoImage from "../assets/images/logo.png";
import minutesService from "../services/minutesService";
import i18n from "../i18n/config";

const mockNavigate = vi.fn();
const mockToken = "mocktoken";
const updateMetadataMock = vi.fn();
const updateMinutesMock = vi.fn();
const hasStateChangedMock = vi.fn();

vi.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavigate,
    useParams: () => ({
      token: mockToken,
    }),
  };
});

const renderElement = () =>
  render(
    <MinutesContext.Provider
      value={[
        mockMinutesContextState,
        {
          updateMinutes: updateMinutesMock,
          updateMetadata: updateMetadataMock,
          hasStateChanged: hasStateChangedMock,
        },
      ]}
    >
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <LoadingPage />
        </I18nextProvider>
      </ThemeProvider>
    </MinutesContext.Provider>,
  );

describe("LoadingPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("renders loading", () => {
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    const loadingText = screen.getByText("Loading");

    waitFor(() => {
      expect(loadingText).toBeDefined();
    });
  });

  test("renders image", () => {
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    const imageElement = screen.getByRole("img");
    waitFor(() => {
      expect(imageElement.src).toContain(logoImage);
    });
  });

  test("fetches minutes and sets context state with confirm when state has been changed", async () => {
    vi.stubGlobal("confirm", vi.fn());
    window.confirm.mockReturnValueOnce(true);
    hasStateChangedMock.mockReturnValueOnce(true);
    const mockToast = vi.spyOn(toast, "error");
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    await waitFor(() => {
      expect(mockToast).not.toHaveBeenCalled();
      expect(window.confirm).toHaveBeenCalledOnce();
      expect(window.confirm).toHaveBeenCalledWith(
        "This action will overwrite cached minutes. Are you sure?",
      );

      expect(mockGetMinutesByToken).toHaveBeenCalledOnce();
      expect(mockGetMinutesByToken).toHaveBeenCalledWith(mockToken);

      expect(updateMetadataMock).toHaveBeenCalledOnce();
      expect(updateMetadataMock).toHaveBeenCalledWith({
        writeAccess: Boolean(mockGetMinutesResponse.writeToken),
        writeToken: mockGetMinutesResponse.writeToken,
        readToken: mockGetMinutesResponse.readToken,
      });

      expect(mockNavigate.mock.calls[0][0]).toBe("/minutes");
    });
  });

  test("fetches minutes and sets context state without confirm when state has NOT been changed", async () => {
    vi.stubGlobal("confirm", vi.fn());
    window.confirm.mockReturnValueOnce(true);
    hasStateChangedMock.mockReturnValueOnce(false);
    const mockToast = vi.spyOn(toast, "error");
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    await waitFor(() => {
      expect(mockToast).not.toHaveBeenCalled();
      expect(window.confirm).not.toHaveBeenCalled();

      expect(mockGetMinutesByToken).toHaveBeenCalledOnce();
      expect(mockGetMinutesByToken).toHaveBeenCalledWith(mockToken);

      expect(updateMetadataMock).toHaveBeenCalledOnce();
      expect(updateMetadataMock).toHaveBeenCalledWith({
        writeAccess: Boolean(mockGetMinutesResponse.writeToken),
        writeToken: mockGetMinutesResponse.writeToken,
        readToken: mockGetMinutesResponse.readToken,
      });

      expect(mockNavigate.mock.calls[0][0]).toBe("/minutes");
    });
  });

  test("cancels when confirmation is cancelled", async () => {
    vi.stubGlobal("confirm", vi.fn());
    window.confirm.mockReturnValueOnce(false);
    hasStateChangedMock.mockReturnValueOnce(true);
    const mockToast = vi.spyOn(toast, "error");
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    await waitFor(() => {
      expect(mockToast).not.toHaveBeenCalled();
      expect(window.confirm).toHaveBeenCalledOnce();

      expect(mockGetMinutesByToken).toHaveBeenCalledOnce();
      expect(mockGetMinutesByToken).toHaveBeenCalledWith(mockToken);

      expect(updateMetadataMock).not.toHaveBeenCalled();

      expect(mockNavigate.mock.calls[0][0]).toBe("/minutes");
    });
  });

  test("alerts user and navigates to /minutes on error", async () => {
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockRejectedValueOnce();
    const mockToast = vi.spyOn(toast, "error");

    renderElement();

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledOnce();
      expect(mockToast).toHaveBeenCalledWith(
        "There was a problem loading minutes",
      );
      expect(mockNavigate.mock.calls[0][0]).toBe("/minutes");
    });

    vi.unstubAllGlobals();
  });
});
