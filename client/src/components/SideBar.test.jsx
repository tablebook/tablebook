import { expect, test, describe, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "./SideBar.jsx";

describe("SideBar", () => {
  beforeEach(() => {
    render(<SideBar />);
  });

  test("renders the primary color element", () => {
    const primaryColorBox = screen.getByText("Text color");
    expect(primaryColorBox).toBeDefined();
  });

  test("renders the secondary color element", () => {
    const secondaryColorBox = screen.getByText("Background color");
    expect(secondaryColorBox).toBeDefined();
  });

  test("renders the restore defaults button", () => {
    const restoreButton = screen.getByText("Restore defaults", {
      selector: "button",
    });
    expect(restoreButton).toBeDefined();
  });

  test("render the flag trigger button", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    expect(flagTrigger).toBeInTheDocument();
  });

  test("open flag picker on click of flag tigger button and close on reclick", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    fireEvent.click(flagTrigger);
    const flagPicker = screen.getByTestId("flagPicker");
    expect(flagPicker).toBeInTheDocument();
    fireEvent.click(flagTrigger);
    expect(flagPicker).not.toBeInTheDocument();
  });

  test("renders the add a field button", () => {
    const addAFieldButton = screen.getByText("Add a field", {
      selector: "button",
    });
    expect(addAFieldButton).toBeDefined();
  });

  test("renders the sign button", () => {
    const signButton = screen.getByText("Sign", { selector: "button" });
    expect(signButton).toBeDefined();
  });

  test("renders the preview button", () => {
    const previewButton = screen.getByText("Preview", { selector: "button" });
    expect(previewButton).toBeDefined();
  });
});
