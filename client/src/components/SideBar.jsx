import { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorPicker from "./ColorPicker.jsx";
import flagFi from "../i18n/locales/flags/fi.svg";
import flagEn from "../i18n/locales/flags/en.svg";

const SideBar = ({ handleModalOpen }) => {
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [textColor, setTextColor] = useState(
    sessionStorage.getItem("textColor") || "#000000",
  );
  const [backgroundColor, setBackgroundColor] = useState(
    sessionStorage.getItem("backgroundColor") || "#ffffff",
  );

  const { t, i18n } = useTranslation();

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

  const handleLanguageChange = (language) => {
    setLanguage(language);
    setIsLanguagePickerOpen(!isLanguagePickerOpen);
    i18n.changeLanguage(language);
  };

  const flagSrc = language === "en" ? flagEn : flagFi;

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
      mt: 4,
      mb: 6,
      position: "relative",
      cursor: "pointer",
    },
    flagList: {
      display: "flex",
      p: 0,
      position: "absolute",
      left: "50%",
      top: "100%",
      transform: "translateX(-50%)",
      backgroundColor: "#fff",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      borderRadius: 1,
    },
    flagListItem: {
      display: "flex",
      justifyContent: "center",
      padding: 1.5,
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    },
    flag: {
      width: 30,
      height: "auto",
      border: 1,
      borderRadius: 1,
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
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
        <Typography sx={styles.customizeTitle}>{t("customize")}:</Typography>
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

      <Box
        sx={styles.languagePickerContainer}
        onClick={() => {
          setIsLanguagePickerOpen(!isLanguagePickerOpen);
        }}
        data-testid="flagTrigger"
      >
        <Box sx={styles.flag} component="img" src={flagSrc} />
        {isLanguagePickerOpen && (
          <List sx={styles.flagList}>
            <ListItemButton
              sx={styles.flagListItem}
              onClick={() => handleLanguageChange("en")}
            >
              <Box
                sx={styles.flag}
                component="img"
                src={flagEn}
                alt="english"
                data-testid="flagPicker"
              />
            </ListItemButton>
            <ListItemButton
              sx={styles.flagListItem}
              onClick={() => handleLanguageChange("fi")}
            >
              <Box
                sx={styles.flag}
                component="img"
                src={flagFi}
                alt="finnish"
              />
            </ListItemButton>
          </List>
        )}
      </Box>

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
