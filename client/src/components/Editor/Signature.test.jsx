import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Signature from "./Signature";
import MinutesContext from "../../contexts/MinutesContext";
import { mockMinutesContextState } from "../../util/test.helpers";

describe("Signature", () => {
  beforeEach(() => {
    render(
      <MinutesContext.Provider value={[mockMinutesContextState, {}]}>
        <Signature />
      </MinutesContext.Provider>,
    );
  });

  test("renders signature and date sections", () => {
    const signatureSection = screen.getByText("Signature");
    const dateSection = screen.getByText("Date");
    expect(signatureSection).toBeInTheDocument();
    expect(dateSection).toBeInTheDocument();
  });

  test("renders signature image with correct source", () => {
    const signatureImage = screen.getByAltText("Signature");
    expect(signatureImage).toBeInTheDocument();
  });

  test("renders signer name clarification", () => {
    const nameClarification = screen.getByText("Test User");
    expect(nameClarification).toBeInTheDocument();
  });

  test("renders date timestamp", () => {
    const dateString = screen.getByText("2024-03-30");
    const timeString = screen.getByText("00:00 UTC");
    expect(dateString).toBeInTheDocument();
    expect(timeString).toBeInTheDocument();
  });
});
