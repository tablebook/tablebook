import React, { useContext } from "react";
import { Popover, Typography, useTheme, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditorContext from "../contexts/EditorContext";
import PopupBase from "./Shared/PopupBase";
import useReloadMinutes from "../util/useReloadMinutes";
import useSaveMinutes from "../util/useSaveMinutes";

function ReloadPopup() {
  const [editorState, updateEditor] = useContext(EditorContext);
  const theme = useTheme();
  const { t } = useTranslation();
  const reloadMinutes = useReloadMinutes();
  const saveMinutes = useSaveMinutes();

  const isPopupOpen = Boolean(editorState.reloadPopupAnchorElement);
  const closePopup = () => updateEditor({ reloadPopupAnchorElement: null });

  const styles = {
    text: {
      fontSize: theme.fontSizes.m,
      textAlign: "center",
      px: 1,
      pb: 2,
    },
    button: {
      fontSize: theme.fontSizes.m,
      m: 1,
    },
  };

  const handleReloadButtonClicked = async () => {
    await reloadMinutes();
    closePopup();
  };

  const handleSaveButtonClicked = async () => {
    await saveMinutes();
    closePopup();
  };

  return (
    <Popover
      open={isPopupOpen}
      anchorEl={editorState.reloadPopupAnchorElement}
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
      <PopupBase title={t("differentVersionDetected")}>
        <Typography sx={styles.text}>
          {t("differentVersionDetectedConfirmation")}
        </Typography>
        <Button
          onClick={handleReloadButtonClicked}
          sx={styles.button}
          variant="contained"
        >
          {t("reload")}
        </Button>
        <Button
          onClick={handleSaveButtonClicked}
          sx={styles.button}
          variant="contained"
        >
          {t("save")}
        </Button>
      </PopupBase>
    </Popover>
  );
}

export default ReloadPopup;
