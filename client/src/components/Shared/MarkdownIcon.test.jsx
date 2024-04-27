import React from "react";
import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MarkdownIcon from "./MarkdownIcon";

describe("MarkdownIcon", () => {
  beforeEach(() => {
    render(<MarkdownIcon height="50px" />);
  });

  test("renders svg element", () => {
    const svgElement = screen.getByTestId("markdown-icon");
    expect(svgElement).toBeDefined();
  });

  test("renders with correct size", () => {
    const svgElement = screen.getByTestId("markdown-icon");
    expect(svgElement).toHaveAttribute("height", "50px");
  });

  test("renders the path element", () => {
    const pathElement = screen.getByTestId("markdown-icon-path"); // Ensure to add `data-testid="markdown-icon-path"` to your path element
    expect(pathElement).toBeInTheDocument();
  });

  test("has the correct path data", () => {
    const pathElement = screen.getByTestId("markdown-icon-path");
    expect(pathElement).toHaveAttribute(
      "d",
      "M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z",
    );
  });
});
