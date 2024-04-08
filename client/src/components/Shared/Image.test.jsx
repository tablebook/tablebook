import React from "react";
import { describe, beforeEach, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Image from "./Image";
import logoImage from "../../assets/images/logo.png";

describe("Image", () => {
  beforeEach(() => {
    render(
      <Image
        src={logoImage}
        alt="image of tablebook logo"
        sx={{ opacity: "0.5" }}
      />,
    );
  });

  test("renders image component", () => {
    const imageElement = screen.getByRole("img");

    expect(imageElement).toBeDefined();
  });

  test("has alt text", () => {
    const imageElement = screen.getByAltText("image of tablebook logo");

    expect(imageElement).toBeDefined();
  });

  test("has correct src", () => {
    const imageElement = screen.getByRole("img");

    expect(imageElement.src).toContain(logoImage);
  });

  test("uses the sx", () => {
    const imageElement = screen.getByRole("img");

    const styles = window.getComputedStyle(imageElement);

    expect(styles.opacity).toBe("0.5");
  });
});
