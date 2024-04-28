import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import EditorContext from "../../contexts/EditorContext";
import ColorsButton from "./ColorsButton";
import { mockEditorContextState } from "../../util/test.helpers";
import theme from "../../theme";
import i18n from "../../i18n/config";

describe("ColorsButton", () => {
  const updateEditorMock = vi.fn();

  beforeEach(() => {
    render(
      <EditorContext.Provider
        value={[mockEditorContextState, updateEditorMock]}
      >
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <ColorsButton />
          </I18nextProvider>
        </ThemeProvider>
      </EditorContext.Provider>,
    );
  });

  test("should render icon and Text", () => {
    const iconElement = screen.getByTestId("PaletteIcon");
    const textElement = screen.getByText("Colors");

    expect(iconElement).toBeDefined();
    expect(textElement).toBeDefined();
  });

  test("should open colors popup on click", () => {
    const button = screen.getByTestId("colorIconButton");

    button.click();

    expect(updateEditorMock).toHaveBeenCalledOnce();
    expect(
      updateEditorMock.mock.calls[0][0].colorSettingsPopupAnchorElement,
    ).toBeDefined();
    expect(
      updateEditorMock.mock.calls[0][0].colorSettingsPopupAnchorElement,
    ).toHaveRole("button");
  });
});
