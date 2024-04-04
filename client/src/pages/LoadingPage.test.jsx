import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { afterEach, describe, test, vi, expect } from "vitest";
import { ThemeProvider } from "@mui/material";
import MinutesContext from "../contexts/MinutesContext";
import {
  mockGetMinutesResponse,
  mockMinutesContextState,
} from "../util/test.helpers";
import theme from "../theme";
import LoadingPage from "./LoadingPage";
import logoImage from "../assets/images/logo.png";
import minutesService from "../services/minutesService";

const mockNavigate = vi.fn();
const mockToken = "mocktoken";
const updateMetadataMock = vi.fn();
const updateMinutesMock = vi.fn();

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
        },
      ]}
    >
      <ThemeProvider theme={theme}>
        <LoadingPage />
      </ThemeProvider>
    </MinutesContext.Provider>,
  );

describe("LoadingPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("renders loading", () => {
    vi.stubGlobal("alert", vi.fn());
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    const loadingText = screen.getByText("Loading");

    waitFor(() => {
      expect(loadingText).toBeDefined();
    });
  });

  test("renders image", () => {
    vi.stubGlobal("alert", vi.fn());
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    const imageElement = screen.getByRole("img");
    waitFor(() => {
      expect(imageElement.src).toContain(logoImage);
    });
  });

  test("fetches minutes and sets context state", async () => {
    vi.stubGlobal("alert", vi.fn());
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockResolvedValueOnce(mockGetMinutesResponse);

    renderElement();

    await waitFor(() => {
      expect(window.alert).not.toHaveBeenCalled();

      expect(mockGetMinutesByToken).toHaveBeenCalledOnce();
      expect(mockGetMinutesByToken).toHaveBeenCalledWith(mockToken);

      expect(updateMetadataMock).toHaveBeenCalledOnce();
      expect(updateMetadataMock).toHaveBeenCalledWith({
        writeAccess: mockGetMinutesResponse.writeAccess,
        writeToken: mockGetMinutesResponse.writeToken,
        readToken: mockGetMinutesResponse.readToken,
      });

      expect(mockNavigate.mock.calls[0][0]).toBe("/minutes");
    });
  });

  test("alerts user and navigates to /minutes on error", async () => {
    vi.stubGlobal("alert", vi.fn());
    window.alert.mockResolvedValueOnce();
    const mockGetMinutesByToken = vi.spyOn(minutesService, "getMinutesByToken");
    mockGetMinutesByToken.mockRejectedValueOnce();

    renderElement();

    await waitFor(() => {
      expect(mockNavigate.mock.calls[0][0]).toBe("/minutes");
    });

    vi.unstubAllGlobals();
  });
});
