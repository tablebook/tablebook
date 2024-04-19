import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/config";
import Signature from "./Signature";
import MinutesContext from "../../contexts/MinutesContext";
import { mockMinutesContextState } from "../../util/test.helpers";

describe("Signature", () => {
  const renderWith = (signatureIndex) => {
    render(
      <MinutesContext.Provider value={[mockMinutesContextState, {}]}>
        <I18nextProvider i18n={i18n}>
          <Signature signatureIndex={signatureIndex} />
        </I18nextProvider>
      </MinutesContext.Provider>,
    );
  };

  describe("with signature that has content", () => {
    beforeEach(() => {
      renderWith(0);
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
      expect(signatureImage.src).toEqual(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAB7CAYAAACb4F7QAAAAAXNSR0I",
      );
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

  describe("with empty signature", () => {
    beforeEach(() => {
      renderWith(1);
    });

    test("renders signature and date sections", () => {
      const signatureSection = screen.getByText("Signature");
      const dateSection = screen.getByText("Date");
      expect(signatureSection).toBeInTheDocument();
      expect(dateSection).toBeInTheDocument();
    });
  });
});
