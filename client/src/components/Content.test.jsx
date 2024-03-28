import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MinutesContext from "../contexts/MinutesContext";
import Content from "./Content";

describe("Content", () => {
  const mockedContext = {
    minutes: {
      name: "",
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
      },
      segments: [
        {
          name: "Test title",
          content: "Test content",
        },
        {
          name: "Decisions",
          content: "Some content",
        },
      ],
      startTime: null,
      signatures: [],
    },

    metadata: {
      writeAccess: null,
      token: null,
    },
  };

  beforeEach(() => {
    function MockedProvider({ children }) {
      return (
        <MinutesContext.Provider value={[mockedContext]}>
          {children}
        </MinutesContext.Provider>
      );
    }
    render(
      <MockedProvider>
        <Content segmentIndex={0} />
      </MockedProvider>,
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
    expect(contentTitleInput.value).toBe("Test title");
  });

  test("content has the correct value", () => {
    const contentTitleInput = screen.getByPlaceholderText("Enter the content");
    expect(contentTitleInput.value).toBe("Test content");
  });
});
