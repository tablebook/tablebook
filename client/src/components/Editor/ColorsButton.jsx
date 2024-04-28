import React, { useContext } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { useTranslation } from "react-i18next";

import EditorContext from "../../contexts/EditorContext";

function ColorsButton() {
  const theme = useTheme();
  const [, updateEditor] = useContext(EditorContext);
  const { t } = useTranslation();

  const styles = {
    colorIcon: {
      fontSize: theme.fontSizes.l,
    },

    colorButton: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },

    colorButtonContainer: {
      display: "flex",
      alignItems: "center",
      height: "100%",
    },
  };

  const handleColorButtonClicked = (event) => {
    const button = event.currentTarget;

    updateEditor({ colorSettingsPopupAnchorElement: button });
  };

  return (
    <Box sx={styles.colorButtonContainer}>
      <IconButton
        sx={styles.colorButton}
        onClick={handleColorButtonClicked}
        data-testid="colorIconButton"
      >
        <PaletteIcon sx={styles.colorIcon} />
        <Typography>{t("colors")}</Typography>
      </IconButton>
    </Box>
  );
}

export default ColorsButton;
