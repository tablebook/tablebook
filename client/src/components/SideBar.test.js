import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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
