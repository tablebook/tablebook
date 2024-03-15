import { useState } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import ColorPicker from "./ColorPicker";

const SideBar = () => {
  const [primaryColor, setPrimaryColor] = useState("#aabbcc");
  const [secondaryColor, setSecondaryColor] = useState("#116ecb");
  
  const theme = useTheme();

  const styles = {
    sideBarContainer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      width: "20vw",
      height: "100dvh",
      minWidth: 280,
      alignItems: "center",
      justifyContent: "center",
    },
    colorPickerContainer: {
      width: 260,
      position: "relative"
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
      my: 3,
      mx: 1,
    },
    colorPickerPrimaryBox: {
      backgroundColor: "#ffffff",
      borderRadius: 1.5,
      border: 1,
      height: 24,
      width: 24,
    },
    colorPickerSecondaryBox: {
      backgroundColor: "#ffffff",
      borderRadius: 1.5,
      border: 1,
      height: 24,
      width: 24,
    },
    languagePickerContainer: {
      textAlign: "center",
      width: 230,
      mt: 1,
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
        <Box sx={styles.colorPickerTitle}>
          <Typography>PRIMARY COLOR</Typography>
          <ColorPicker initialColor={primaryColor}/>
        </Box>
        <Box sx={styles.colorPickerTitle}>
          <Typography>SECONDARY COLOR</Typography>
          <ColorPicker initialColor={secondaryColor}/>
        </Box>
      </Box>

      <Box sx={styles.languagePickerContainer}>*flag*</Box>

      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="secondary" sx={styles.sideBarButton}>
          Add a field
        </Button>
        <Button variant="contained" color="secondary" sx={styles.sideBarButton}>
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
