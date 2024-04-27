import React from "react";
import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/config";
import EditorContext from "../contexts/EditorContext";
import { mockEditorContextState } from "../util/test.helpers";
import LanguagePickerPopup from "./LanguagePickerPopup";

const i18nMock = { changeLanguage: vi.fn() };

vi.mock("react-i18next", async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useTranslation: () => ({ i18n: i18nMock }),
  };
});

describe("LanguagePickerContainer", () => {
  const updateEditorMock = vi.fn();
  beforeEach(() => {
    render(
      <EditorContext.Provider
        value={[
          {
            ...mockEditorContextState,
            languagePopupAnchorElement: document.createElement("button"),
          },
          updateEditorMock,
        ]}
      >
        <I18nextProvider i18n={i18n}>
          <LanguagePickerPopup />
        </I18nextProvider>
      </EditorContext.Provider>,
    );
    waitFor(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render two flags", () => {
    const imageElements = screen.getAllByRole("img");
    expect(imageElements.length).toBe(2);
  });

  test("should change language and close popup on flag clicked", () => {
    const enButton = screen.getByAltText("EN");

    enButton.click();

    expect(updateEditorMock).toHaveBeenCalledTimes(2);
    expect(updateEditorMock).toHaveBeenCalledWith({
      language: "en",
    });
    expect(updateEditorMock).toHaveBeenCalledWith({
      languagePopupAnchorElement: null,
    });
    expect(i18nMock.changeLanguage).toHaveBeenCalledOnce();
    expect(i18nMock.changeLanguage).toHaveBeenCalledWith("en");
  });
});
