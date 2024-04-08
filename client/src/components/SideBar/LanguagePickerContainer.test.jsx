import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguagePickerContainer from "./LanguagePickerContainer";

describe("LanguagePickerContainer", () => {
  beforeEach(() => {
    render(<LanguagePickerContainer />);
  });

  test("renders the flag trigger button", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    expect(flagTrigger).toBeInTheDocument();
  });

  test("open flag picker on click of flag trigger button and close on reclick", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    fireEvent.click(flagTrigger);
    const flagPicker = screen.getByTestId("flagPicker");
    expect(flagPicker).toBeInTheDocument();
    fireEvent.click(flagTrigger);
    expect(flagPicker).not.toBeInTheDocument();
  });
});
