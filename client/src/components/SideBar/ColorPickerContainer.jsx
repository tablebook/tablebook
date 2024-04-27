import React, { useContext } from "react";
import { Box, Button, useTheme, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";
import ColorPicker from "./ColorPicker";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function ColorPickerContainer() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();
  const updateColorDebounced = useDebouncedCallback(
    // function
    (value) => {
      updateMinutes(value);
    },
    // delay in ms
    2,
  );

  const styles = {
    colorPickerContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },

    colorPickerTitleContainer: {
      backgroundColor: theme.palette.background.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 1.5,
      boxShadow: 1,
      p: 2,
      m: 1,
    },

    colorPickerTitle: {
      fontSize: theme.fontSizes.m,
      textAlign: "center",
      flexGrow: 1,
    },

    restoreButtonContainer: {
      mt: 1,
      display: "flex",
      justifyContent: "center",
    },

    restoreButton: {
      width: "75%",
      fontSize: theme.fontSizes.s,
    },
  };

  const updateColor = (type, color) => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

    updateColorDebounced({
      colors: {
        ...minutesState.minutes.colors,
        [type]: color,
      },
    });
  };

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
    <Box sx={styles.colorPickerContainer} data-testid="colorPickerContainer">
      <Paper sx={styles.colorPickerTitleContainer}>
        <Typography sx={styles.colorPickerTitle}>{t("textColor")}</Typography>
        <ColorPicker
          onColorChange={(color) => updateColor("primary", color)}
          currColor={minutesState.minutes.colors.primary}
        />
      </Paper>

      <Box sx={styles.colorPickerTitleContainer}>
        <Typography sx={styles.colorPickerTitle}>
          {t("backgroundColor")}
        </Typography>
        <ColorPicker
          onColorChange={(color) => updateColor("secondary", color)}
          currColor={minutesState.minutes.colors.secondary}
        />
      </Box>

      <Box sx={styles.restoreButtonContainer}>
        <Button
          variant="contained"
          sx={styles.restoreButton}
          onClick={restoreDefaults}
        >
          {t("restoreDefaults")}
        </Button>
      </Box>
    </Box>
  );
}

export default ColorPickerContainer;
