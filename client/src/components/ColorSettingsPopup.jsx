import React, { useContext } from "react";

import { Popover } from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorPickerContainer from "./SideBar/ColorPickerContainer";
import PopupBase from "./Shared/PopupBase";
import EditorContext from "../contexts/EditorContext";

function ColorSettingsPopup() {
  const [editorState, updateEditor] = useContext(EditorContext);
  const { t } = useTranslation();

  const isPopupOpen = Boolean(editorState.colorSettingsPopupAnchorElement);
  const closePopup = () =>
    updateEditor({ colorSettingsPopupAnchorElement: null });

  return (
    <Popover
      open={isPopupOpen}
      anchorEl={editorState.colorSettingsPopupAnchorElement}
      onClose={closePopup}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <PopupBase title={t("colorSettings")} width={250}>
        <ColorPickerContainer />
      </PopupBase>
    </Popover>
  );
}

export default ColorSettingsPopup;
