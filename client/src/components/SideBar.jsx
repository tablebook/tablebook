import { useState } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import ColorPicker from "./ColorPicker.jsx";

const SideBar = ({ handleModalOpen }) => {
  const [textColor, setTextColor] = useState(
    sessionStorage.getItem("textColor") || "#000000",
  );
  const [backgroundColor, setBackgroundColor] = useState(
    sessionStorage.getItem("backgroundColor") || "#ffffff",
  );

  const theme = useTheme();

  const restoreDefaults = () => {
    setTextColor("#000000");
    setBackgroundColor("#ffffff");
    sessionStorage.setItem("textColor", "#000000");
    sessionStorage.setItem("backgroundColor", "#ffffff");
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
    sessionStorage.setItem("textColor", color);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
    sessionStorage.setItem("backgroundColor", color);
  };

  const styles = {
    sideBarContainer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      width: "20vw",
      minWidth: 280,
      alignItems: "center",
      justifyContent: "center",
    },
    colorPickerContainer: {
      width: 230,
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    customizeTitle: {
      fontSize: 22,
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
      py: 2,
      px: 2,
      my: 1,
      mx: 1,
    },
    restoreButtonContainer: {
      mt: 1,
      display: "flex",
      justifyContent: "center",
    },
    restoreButton: {
      width: 170,
      fontSize: 12,
      border: 0.5,
    },
    languagePickerContainer: {
      textAlign: "center",
      width: 230,
      mt: 4,
      mb: 14,
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      width: 180,
      mt: 3,
      mb: 5,
    },
    sideBarButton: {
      p: 2,
      m: 2,
      border: 0.5,
    },
  };

  return (
    <Box sx={styles.sideBarContainer}>
      <Box sx={styles.colorPickerContainer}>
        <Typography sx={styles.customizeTitle}>Customize:</Typography>
        <Box sx={styles.colorPickerTitle}>
          <Typography>Text color</Typography>
          <ColorPicker
            onColorChange={handleTextColorChange}
            currColor={textColor}
          />
        </Box>
        <Box sx={styles.colorPickerTitle}>
          <Typography>Background color</Typography>
          <ColorPicker
            onColorChange={handleBackgroundColorChange}
            currColor={backgroundColor}
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
      <Box sx={styles.languagePickerContainer}>*flag*</Box>
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="secondary" sx={styles.sideBarButton}>
          Add a field
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={styles.sideBarButton}
          onClick={handleModalOpen}
        >
          Sign
        </Button>
        <Button variant="contained" color="secondary" sx={styles.sideBarButton}>
          Preview
        </Button>
      </Box>
    </Box>
  );
};

export default SideBar;
