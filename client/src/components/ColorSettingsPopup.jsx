import React, { useContext } from "react";
import {
  Box,
  Button,
  useTheme,
  Typography,
  Paper,
  Popover,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import PopupBase from "./Shared/PopupBase";
import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../util/useHandleSignatureAffectingChange";

function ColorPickerButton({ color, onClick }) {
  const styles = {
    button: {
      backgroundColor: color,
      width: 30,
      height: 30,
      flexShrink: 0,
      ":hover": {
        cursor: "pointer",
      },
    },
  };

  return <Paper elevation={8} sx={styles.button} onClick={onClick} />;
}

function ColorSettingsPopup() {
  const theme = useTheme();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const [editorState, updateEditor] = useContext(EditorContext);
  const { t } = useTranslation();
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();

  const styles = {
    colorPickerContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },

    colorPickerTitleContainer: {
      backgroundColor: theme.palette.background.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 1.5,
      boxShadow: 1,
      p: 2,
      gap: 1,
    },

    colorPickerTitle: {
      fontSize: theme.fontSizes.m,
      textAlign: "center",
      flexGrow: 1,
    },

    restoreButton: {
      width: "75%",
      fontSize: theme.fontSizes.s,
      mx: "auto",
    },
  };

  const isPopupOpen = Boolean(editorState.colorSettingsPopupAnchorElement);
  const closePopup = () =>
    updateEditor({ colorSettingsPopupAnchorElement: null });

  const defaultColors = {
    primary: "#000000",
    secondary: "#FFFFFF",
  };

  const restoreDefaults = () => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

    updateMinutes({
      colors: {
        primary: defaultColors.primary,
        secondary: defaultColors.secondary,
      },
    });
  };

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
        <Box
          sx={styles.colorPickerContainer}
          data-testid="colorPickerContainer"
        >
          <Box sx={styles.colorPickerTitleContainer}>
            <Typography sx={styles.colorPickerTitle}>
              {t("textColor")}
            </Typography>
            <ColorPickerButton
              color={minutesState.minutes.colors.primary}
              onClick={(event) => {
                updateEditor({
                  colorPickerPopupAnchorElement: event.currentTarget,
                  colorPickerPopupColor: "primary",
                });
              }}
            />
          </Box>

          <Box sx={styles.colorPickerTitleContainer}>
            <Typography sx={styles.colorPickerTitle}>
              {t("backgroundColor")}
            </Typography>
            <ColorPickerButton
              color={minutesState.minutes.colors.secondary}
              onClick={(event) => {
                updateEditor({
                  colorPickerPopupAnchorElement: event.currentTarget,
                  colorPickerPopupColor: "secondary",
                });
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={styles.restoreButton}
            onClick={restoreDefaults}
          >
            {t("restoreDefaults")}
          </Button>
        </Box>
      </PopupBase>
    </Popover>
  );
}

export default ColorSettingsPopup;
