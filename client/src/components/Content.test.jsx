import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Content from "./Content.jsx";

describe("Content", () => {
  beforeEach(() => {
    render(<Content />);
  });

  test("renders content title input", () => {
    const contentTitleInput = screen.getByPlaceholderText("Enter the title");
    expect(contentTitleInput).toBeInTheDocument();
  });

  test("renders content input", () => {
    const contentInput = screen.getByPlaceholderText("Enter the content");
    expect(contentInput).toBeInTheDocument();
  });
});
