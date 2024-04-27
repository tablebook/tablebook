import { Box, Link, Button, useTheme, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import EditorContext from "../contexts/EditorContext";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";
import logoImage from "../assets/images/logo.png";
import Image from "./Shared/Image";
import useReloadMinutes from "../util/useReloadMinutes";
import useSaveMinutes from "../util/useSaveMinutes";
import DownloadPDFButton from "./DownloadPDFButton";
import flagFi from "../i18n/locales/flags/fi.svg";
import flagEn from "../i18n/locales/flags/en.svg";

function TopBar({ containerRef }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [editorState, updateEditor] = useContext(EditorContext);
  const [minutesState, { updateMetadata, clearState }] =
    useContext(MinutesContext);
  const reloadMinutes = useReloadMinutes();
  const saveMinutes = useSaveMinutes();

  const styles = {
    topBarContainer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
    },

    logo: {
      height: 60,
      width: 60,
    },

    titleText: {
      display: { xs: "none", md: "block" },
    },

    topBarButton: {
      fontSize: theme.fontSizes.s,
      mx: 1.5,
      flexShrink: 0,
    },

    buttonsContainer: {
      display: "flex",
      px: 1,
      alignItems: "center",
      overflow: "auto",
      height: "100%",
    },

    titleContainer: {
      display: "flex",
      backgroundColor: theme.palette.background.main,
      borderRadius: 9,
      boxShadow: 3,
      px: 2,
      m: 1,
    },

    statusMessageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.background.main,
      mx: 1.5,
      px: 2,
      py: 1,
      borderRadius: 1,
      flexShrink: 0,
    },

    statusMessage: {
      textAlign: "center",
    },

    flag: {
      width: 38,
      border: 1,
      borderRadius: 1,
      borderColor: "black",
    },
  };

  const handleCreateNewClicked = () => {
    if (!window.confirm(t("clearDocument"))) {
      return;
    }

    clearState();
  };

  const handleShareClicked = async (event) => {
    try {
      const shareButton = event.currentTarget;

      const isAlreadyStored =
        minutesState.metadata.writeToken || minutesState.metadata.readToken;

      if (isAlreadyStored) {
        updateEditor({ sharePopupAnchorElement: shareButton });
        return;
      }

      if (!window.confirm(t("storeDocument"))) {
        return;
      }

      const createdMinutes = await minutesService.createMinutes(
        minutesState.minutes,
      );

      updateMetadata({
        writeAccess: true,
        writeToken: createdMinutes.writeToken,
        readToken: createdMinutes.readToken,
      });

      updateEditor({ sharePopupAnchorElement: shareButton });
    } catch (error) {
      toast.error(t("sharingError"));
    }
  };

  const getStatusMessage = () => {
    switch (minutesState.metadata.writeAccess) {
      case null:
        return t("minutesNotStored");
      case true:
        return t("editingStoredMinutes");
      case false:
        return t("readingStoredMinutes");
      default:
        return t("unknownState");
    }
  };

  const handleLanguageButtonClicked = (event) => {
    const languageButton = event.currentTarget;

    updateEditor({ languagePopupAnchorElement: languageButton });
  };

  const handleColorButtonClicked = (event) => {
    const languageButton = event.currentTarget;

    updateEditor({ colorSettingsPopupAnchorElement: languageButton });
  };

  const flagSrc = editorState.language === "en" ? flagEn : flagFi;

  return (
    <Box sx={styles.topBarContainer} ref={containerRef}>
      <Link
        component={RouterLink}
        to="/minutes"
        underline="hover"
        color="primary.contrastText"
      >
        <Box sx={styles.titleContainer}>
          <Image sx={styles.logo} src={logoImage} />
          <Typography sx={styles.titleText} variant="header">
            TableBook
          </Typography>
        </Box>
      </Link>

      <Box sx={styles.buttonsContainer}>
        <Box sx={styles.statusMessageContainer}>
          <Typography color="background.contrastText">
            {getStatusMessage()}
          </Typography>
        </Box>

        {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
            onClick={handleColorButtonClicked}
          >
            {t("colorSettings")}
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          sx={styles.topBarButton}
          onClick={handleCreateNewClicked}
        >
          {t("createNew")}
        </Button>

        {minutesState.metadata.writeAccess && (
          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
            onClick={saveMinutes}
          >
            {t("save")}
          </Button>
        )}

        {typeof minutesState.metadata.writeAccess === "boolean" && ( // Is defined
          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
            onClick={reloadMinutes}
          >
            {t("reload")}
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          sx={styles.topBarButton}
          onClick={handleShareClicked}
        >
          {t("share")}
        </Button>

        {isMobile ? (
          <DownloadPDFButton
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
          />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
            onClick={() => updateEditor({ isPreviewPrintPDFModalOpen: true })}
          >
            {t("preview/printPdf")}
          </Button>
        )}

        <Button onClick={handleLanguageButtonClicked}>
          <Image sx={styles.flag} src={flagSrc} alt={t("language")} />
        </Button>
      </Box>
    </Box>
  );
}

export default TopBar;
