import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import EditorButtons from "./EditorButtons.jsx";

describe("EditorButtons", () => {
  beforeEach(() => {
    render(<EditorButtons />);
  });

  test("renders the up button", () => {
    const upButton = screen.getByTestId("upButton");
    expect(upButton).toBeInTheDocument();
  });

  test("renders the delete button", () => {
    const upButton = screen.getByTestId("deleteButton");
    expect(upButton).toBeInTheDocument();
  });

  test("renders the down button", () => {
    const upButton = screen.getByTestId("downButton");
    expect(upButton).toBeInTheDocument();
  });
});
