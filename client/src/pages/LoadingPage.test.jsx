import React from "react";
import { render, waitFor } from "@testing-library/react";
import { afterAll, beforeEach, describe, test, vi, expect } from "vitest";
import { ThemeProvider } from "@mui/material";
import MinutesContext from "../contexts/MinutesContext";
import { mockMinutesContextState } from "../util/test.helpers";
import theme from "../theme";
import LoadingPage from "./LoadingPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavigate,
    useParams: () => "token",
  };
});

describe("LoadingPage", () => {
  const updateMetadataMock = vi.fn();
  const updateMinutesaMock = vi.fn();

  beforeEach(() => {
    render(
      <MinutesContext.Provider
        value={[
          mockMinutesContextState,
          updateMinutesaMock,
          updateMetadataMock,
        ]}
      >
        <ThemeProvider theme={theme}>
          <LoadingPage />
        </ThemeProvider>
      </MinutesContext.Provider>,
    );
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("alerts user and navigates to /minutes on error", () => {
    vi.stubGlobal("alert", vi.fn());
    window.alert.mockResolvedValueOnce();

    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledOnce();
      expect(mockNavigate).toHaveBeenCalledWith("/minutes");
    });

    vi.unstubAllGlobals();
  });
});
