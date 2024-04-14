import React, { useState } from "react";
import { Box, List, ListItemButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import flagFi from "../i18n/locales/flags/fi.svg";
import flagEn from "../i18n/locales/flags/en.svg";

function LanguagePickerContainer() {
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

  const styles = {
    languagePickerContainer: {
      display: "flex",
      position: "relative",
      cursor: "pointer",
      zIndex: 1,
      px: 1.5,
    },

    flagList: {
      display: "flex",
      flexDirection: "column",
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
      padding: 1.5,
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    },

    flag: {
      width: 38,
      height: "auto",
      border: 1,
      borderRadius: 1,
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    },
  };

  const flagSrc = language === "en" ? flagEn : flagFi;

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguagePickerOpen(!isLanguagePickerOpen);
    i18n.changeLanguage(newLanguage);
  };

  return (
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
            <Box sx={styles.flag} component="img" src={flagFi} alt="finnish" />
          </ListItemButton>
        </List>
      )}
    </Box>
  );
}

export default LanguagePickerContainer;
