import React, { useContext } from "react";
import { List, ListItemButton, Popover } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditorContext from "../contexts/EditorContext";
import flagFi from "../i18n/locales/flags/fi.svg";
import flagEn from "../i18n/locales/flags/en.svg";
import Image from "./Shared/Image";

function LanguagePickerPopup() {
  const [editorState, updateEditor] = useContext(EditorContext);
  const { i18n } = useTranslation();

  const styles = {
    flagList: {
      display: "flex",
      flexDirection: "column",
      p: 0,
    },

    flagListItem: {
      p: 1.5,
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    },

    flag: {
      width: 38,
      border: 1,
      borderRadius: 1,
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    },
  };

  const isPopupOpen = Boolean(editorState.languagePopupAnchorElement);
  const closePopup = () => updateEditor({ languagePopupAnchorElement: null });

  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    updateEditor({ language: newLanguage });
    closePopup();
  };

  return (
    <Popover
      open={isPopupOpen}
      anchorEl={editorState.languagePopupAnchorElement}
      onClose={closePopup}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <List sx={styles.flagList}>
        <ListItemButton
          sx={styles.flagListItem}
          onClick={() => handleLanguageChange("en")}
          data-testid="flagPicker"
        >
          <Image sx={styles.flag} src={flagEn} alt="EN" />
        </ListItemButton>

        <ListItemButton
          sx={styles.flagListItem}
          onClick={() => handleLanguageChange("fi")}
        >
          <Image sx={styles.flag} component="img" src={flagFi} alt="FI" />
        </ListItemButton>
      </List>
    </Popover>
  );
}

export default LanguagePickerPopup;
