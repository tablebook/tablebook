import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MinutesContext from "../contexts/MinutesContext";
import Content from "./Content";
import { mockMinutesContextState } from "../util/test.helpers";

describe("Content", () => {
  beforeEach(() => {
    render(
      <MinutesContext.Provider value={[mockMinutesContextState, {}]}>
        <Content segmentIndex={0} />
      </MinutesContext.Provider>,
    );
  });

  test("renders content title input", () => {
    const contentTitleInput = screen.getByPlaceholderText("Enter the title");
    expect(contentTitleInput).toBeInTheDocument();
  });

  test("renders content input", () => {
    const contentInput = screen.getByPlaceholderText("Enter the content");
    expect(contentInput).toBeInTheDocument();
  });

  test("title has the correct value", () => {
    const contentTitleInput = screen.getByPlaceholderText("Enter the title");
    expect(contentTitleInput.value).toBe("Agenda");
  });

  test("content has the correct value", () => {
    const contentTitleInput = screen.getByPlaceholderText("Enter the content");
    expect(contentTitleInput.value).toBe("Some content");
  });
});
