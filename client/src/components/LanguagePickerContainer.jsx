import React, { useState, useContext } from "react";
import { Box, List, ListItemButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditorContext from "../contexts/EditorContext";
import flagFi from "../i18n/locales/flags/fi.svg";
import flagEn from "../i18n/locales/flags/en.svg";
import Image from "./Shared/Image";

function LanguagePickerContainer() {
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const [editorState, updateEditor] = useContext(EditorContext);
  const { i18n, t } = useTranslation();

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

  const flagSrc = editorState.language === "en" ? flagEn : flagFi;

  const handleLanguageChange = (newLanguage) => {
    setIsLanguagePickerOpen(!isLanguagePickerOpen);
    i18n.changeLanguage(newLanguage);
    updateEditor({ language: newLanguage });
  };

  return (
    <Box
      sx={styles.languagePickerContainer}
      onClick={() => {
        setIsLanguagePickerOpen(!isLanguagePickerOpen);
      }}
      data-testid="flagTrigger"
    >
      <Image sx={styles.flag} src={flagSrc} alt={t("language")} />

      {isLanguagePickerOpen && (
        <List sx={styles.flagList}>
          <ListItemButton
            sx={styles.flagListItem}
            onClick={() => handleLanguageChange("en")}
          >
            <Image
              sx={styles.flag}
              src={flagEn}
              alt="EN"
              data-testid="flagPicker"
            />
          </ListItemButton>

          <ListItemButton
            sx={styles.flagListItem}
            onClick={() => handleLanguageChange("fi")}
          >
            <Image sx={styles.flag} component="img" src={flagFi} alt="FI" />
          </ListItemButton>
        </List>
      )}
    </Box>
  );
}

export default LanguagePickerContainer;
