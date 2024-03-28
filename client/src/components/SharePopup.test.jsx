import { ThemeProvider } from "@mui/material/styles";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import MinutesContext from "../contexts/MinutesContext.jsx";
import {
  mockEditorContextState,
  mockMinutesContextState,
} from "../util/test.helpers";
import EditorContext from "../contexts/EditorContext.jsx";
import SharePopup from "./SharePopup.jsx";
import theme from "../theme";

describe("SharePopup", () => {
  const updateEditorMock = vi.fn();

  beforeEach(() => {
    render(
      <MinutesContext.Provider value={[mockMinutesContextState]}>
        <EditorContext.Provider
          value={[
            {
              ...mockEditorContextState,
              sharePopupAnchorElement: document.createElement("button"),
            },
            updateEditorMock,
          ]}
        >
          <ThemeProvider theme={theme}>
            <SharePopup />
          </ThemeProvider>
        </EditorContext.Provider>
      </MinutesContext.Provider>,
    );

    // This does something for the popup element to properly finish doing all it's logic so that warnings are not given.
    // The warning indicates that it would still doing something after the test is done.
    // Vitest waitFor doesn't work
    waitFor(() => {});
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  test("renders the title", () => {
    const titleElement = screen.getByText("Share");
    expect(titleElement).toBeDefined();
  });

  test("renders the read link label", () => {
    const titleElement = screen.getByText("Read link");
    expect(titleElement).toBeDefined();
  });

  test("renders the edit link label", () => {
    const titleElement = screen.getByText("Edit link");
    expect(titleElement).toBeDefined();
  });

  test("renders read link", () => {
    const titleElement = screen.getByDisplayValue(
      "http://localhost:3000/minutes/readaccesstoken",
    );
    expect(titleElement).toBeDefined();
  });

  test("renders edit link", () => {
    const titleElement = screen.getByDisplayValue(
      "http://localhost:3000/minutes/writeaccesstoken",
    );
    expect(titleElement).toBeDefined();
  });

  test("renders read link button", () => {
    const inputContainer = screen.getByTestId("read-only-link", {
      selector: "div",
    });
    const button = inputContainer.querySelector("button");

    expect(button).toBeDefined();
  });

  test("renders write link button", () => {
    const inputContainer = screen.getByTestId("write-link", {
      selector: "div",
    });
    const button = inputContainer.querySelector("button");

    expect(button).toBeDefined();
  });

  describe("Clipboard", () => {
    beforeEach(() => {
      vi.stubGlobal("navigator", {
        clipboard: {
          writeText: vi.fn(),
        },
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    test("copies read link copy button copies to clipboard", () => {
      const inputContainer = screen.getByTestId("read-only-link", {
        selector: "div",
      });
      const button = inputContainer.querySelector("button");
      button.click();

      expect(navigator.clipboard.writeText).toHaveBeenCalledOnce(
        "http://localhost:3000/minutes/readaccesstoken",
      );
    });

    test("copies write link copy button copies to clipboard", () => {
      const inputContainer = screen.getByTestId("write-link", {
        selector: "div",
      });
      const button = inputContainer.querySelector("button");
      button.click();

      expect(navigator.clipboard.writeText).toHaveBeenCalledOnce(
        "http://localhost:3000/minutes/writeaccesstoken",
      );
    });
  });
});
