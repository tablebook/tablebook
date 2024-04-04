import React, { useContext } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorPicker from "./ColorPicker";
import MinutesContext from "../contexts/MinutesContext";

function ColorPickerContainer() {
  const theme = useTheme();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const { t } = useTranslation();

  const styles = {
    colorPickerContainer: {
      width: "75%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },

    customizeTitle: {
      fontSize: theme.fontSizes.m,
      textAlign: "center",
      fontStyle: "italic",
      fontWeight: "bold",
    },

    colorPickerTitle: {
      backgroundColor: theme.palette.secondary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 5,
      border: 0.5,
      boxShadow: 1,
      p: 2,
      m: 1
    },

    restoreButtonContainer: {
      mt: 1,
      display: "flex",
      justifyContent: "center",
    },

    restoreButton: {
      width: "75%",
      fontSize: theme.fontSizes.xs,
      border: 0.5,
    },
  };

  // debouncer is to delay state updates, because rapid
  // state updates on color picker throws error
  const debounce = (func, wait) => {
    let timeoutId = null;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  const updateColor = debounce((type, color) => {
    updateMinutes({
      colors: {
        ...minutesState.minutes.colors,
        [type]: color,
      },
    });
  }, 2);

  const defaultColors = {
    primary: "#000000",
    secondary: "#FFFFFF",
  };

  const restoreDefaults = () => {
    updateMinutes({
      colors: {
        primary: defaultColors.primary,
        secondary: defaultColors.secondary,
      },
    });
  };

  return (
    <Box sx={styles.colorPickerContainer} data-testid="colorPickerContainer">
      <Typography sx={styles.customizeTitle}>{t("customize")}:</Typography>

      <Box sx={styles.colorPickerTitle}>
        <Typography>Text color</Typography>
        <ColorPicker
          onColorChange={(color) => updateColor("primary", color)}
          currColor={minutesState.minutes.colors.primary}
        />
      </Box>

      <Box sx={styles.colorPickerTitle}>
        <Typography>Background color</Typography>
        <ColorPicker
          onColorChange={(color) => updateColor("secondary", color)}
          currColor={minutesState.minutes.colors.secondary}
        />
      </Box>

      <Box sx={styles.restoreButtonContainer}>
        <Button
          variant="contained"
          color="secondary"
          sx={styles.restoreButton}
          onClick={restoreDefaults}
        >
          Restore defaults
        </Button>
      </Box>
    </Box>
  );
}

export default ColorPickerContainer;
