import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TopBar from "./TopBar.jsx";

describe("TopBar", () => {
  beforeEach(() => {
    render(<TopBar />);
  });

  test("renders the title", () => {
    const titleElement = screen.getByText("TableBook", { selector: "a" });
    expect(titleElement).toBeDefined();
    expect(titleElement.href).toEqual("http://localhost:3000/");
  });

  test("renders create new button", () => {
    const createNewButton = screen.getByText("Create New", {
      selector: "button",
    });
    expect(createNewButton).toBeDefined();
  });

  test("renders revert button", () => {
    const revertButton = screen.getByText("Revert", {
      selector: "button",
    });
    expect(revertButton).toBeDefined();
  });

  test("renders save button", () => {
    const saveButton = screen.getByText("Save", {
      selector: "button",
    });
    expect(saveButton).toBeDefined();
  });

  test("renders share button", () => {
    const shareButton = screen.getByText("Share", {
      selector: "button",
    });
    expect(shareButton).toBeDefined();
  });

  test("renders print pdf button", () => {
    const printPdfButton = screen.getByText("Print PDF", {
      selector: "button",
    });
    expect(printPdfButton).toBeDefined();
  });
});
