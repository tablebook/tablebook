import React, { useState, useContext } from "react";
import { Box, Button, useTheme, List, ListItemButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorPickerContainer from "./ColorPickerContainer";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";
import flagFi from "../i18n/locales/flags/fi.svg";
import flagEn from "../i18n/locales/flags/en.svg";

function SideBar() {
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const [, updateEditor] = useContext(EditorContext);

  const { i18n } = useTranslation();

  const theme = useTheme();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguagePickerOpen(!isLanguagePickerOpen);
    i18n.changeLanguage(newLanguage);
  };

  const flagSrc = language === "en" ? flagEn : flagFi;

  const handleAddField = () => {
    const newSegments = [
      ...minutesState.minutes.segments,
      {
        name: "",
        content: "",
      },
    ];
    updateMinutes({ segments: newSegments });
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
      <ColorPickerContainer />

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
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddField}
          sx={styles.sideBarButton}
        >
          Add a field
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={styles.sideBarButton}
          onClick={() => updateEditor({ isSignatureModalOpen: true })}
        >
          Sign
        </Button>
        <Button variant="contained" color="secondary" sx={styles.sideBarButton}>
          Preview
        </Button>
      </Box>
    </Box>
  );
}

export default SideBar;
