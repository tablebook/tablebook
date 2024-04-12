import React, { useContext } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";
import ColorPicker from "./ColorPicker";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function ColorPickerContainer() {
  const theme = useTheme();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();
  const { t } = useTranslation();
  const updateSignatureDebounced = useDebouncedCallback(
    // function
    (value) => {
      updateMinutes(value);
    },
    // delay in ms
    1000,
  );
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
      width: "85%",
      maxWidth: 280,
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },

    customizeTitle: {
      fontSize: theme.fontSizes.m,
      textAlign: "center",
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
      m: 1,
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

  const hexToRgb = (hex) => {
    const hexIsShort = hex.length === 4;
    const rgbRed = parseInt(hexIsShort ? hex[1] + hex[1] : hex[1] + hex[2], 16);
    const rgbGreen = parseInt(
      hexIsShort ? hex[2] + hex[2] : hex[3] + hex[4],
      16,
    );
    const rgbBlue = parseInt(
      hexIsShort ? hex[3] + hex[3] : hex[5] + hex[6],
      16,
    );
    return [rgbRed, rgbGreen, rgbBlue];
  };

  const changeSignatureColorsToContext = (color) => {
    minutesState.minutes.signatures.forEach((signature) => {
      if (signature.image) {
        const newSignature = new Image();
        newSignature.src = minutesState.minutes.signatures[0].image;
        newSignature.onload = () => {
          const canvas = document.createElement("canvas");
          const canvasContext = canvas.getContext("2d");
          canvas.width = newSignature.width;
          canvas.height = newSignature.height;

          canvasContext.drawImage(newSignature, 0, 0);

          const canvasData = canvasContext.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          );
          const { data } = canvasData;

          const [rgbRed, rgbGreen, rgbBlue] = hexToRgb(color);

          for (let i = 0; i < data.length; i += 4) {
            // Only change non-transparent pixels
            if (data[i + 3] > 0) {
              data[i] = rgbRed;
              data[i + 1] = rgbGreen;
              data[i + 2] = rgbBlue;
            }
          }

          canvasContext.putImageData(canvasData, 0, 0);

          updateSignatureDebounced({
            signatures: [
              {
                ...signature,
                image: canvas.toDataURL(),
              },
            ],
          });
        };
      }
    });
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

    if (type === "primary") {
      changeSignatureColorsToContext(color);
    }
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
