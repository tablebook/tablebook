import React from "react";
import { expect, test, describe, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import LanguagePickerContainer from "./LanguagePickerContainer";
import i18n from "../i18n/config";
import EditorContext from "../contexts/EditorContext";
import { mockEditorContextState } from "../util/test.helpers";

describe("LanguagePickerContainer", () => {
  beforeEach(() => {
    render(
      <EditorContext.Provider value={[mockEditorContextState]}>
        <I18nextProvider i18n={i18n}>
          <LanguagePickerContainer />
        </I18nextProvider>
      </EditorContext.Provider>,
    );
  });

  test("renders the flag picker", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    expect(flagTrigger).toBeInTheDocument();
  });

  test("open flag picker on click of flag trigger button and close on reclick", () => {
    const flagTrigger = screen.getByTestId("flagTrigger");
    fireEvent.click(flagTrigger);
    const flagPicker = screen.getByTestId("flagPicker");
    expect(flagPicker).toBeInTheDocument();
    fireEvent.click(flagTrigger);
    expect(flagPicker).not.toBeInTheDocument();
  });
});
