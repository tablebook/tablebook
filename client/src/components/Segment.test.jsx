import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Segment from "./Segment";
import MinutesContext from "../contexts/MinutesContext";
import { mockMinutesContextState } from "../util/test.helpers";

describe("Editor", () => {
  beforeEach(() => {
    render(
      <MinutesContext.Provider value={[mockMinutesContextState, {}]}>
        <Segment segmentIndex={0} />
      </MinutesContext.Provider>,
    );
  });

  test("renders the editor buttons", () => {
    const editorButtons = screen.getAllByTestId("editor-buttons");
    expect(editorButtons).toBeDefined();
  });

  test("renders the content", () => {
    const contentComponent = screen.getAllByTestId("content-component");
    expect(contentComponent).toBeDefined();
  });
});
