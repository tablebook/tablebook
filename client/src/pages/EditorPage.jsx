import { Box, useTheme } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import _ from "lodash";
import TopBar from "../components/TopBar";
import Editor from "../components/Editor/Editor";
import Footer from "../components/Footer";
import SharePopup from "../components/SharePopup";
import SignatureModal from "../components/SignatureModal";
import PreviewPrintPDFModal from "../components/PreviewPrintPDFModal";
import ReloadPopup from "../components/ReloadPopup";
import EditorContext from "../contexts/EditorContext";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";
import LanguagePickerPopup from "../components/LanguagePickerPopup";
import ColorSettingsPopup from "../components/ColorSettingsPopup";
import ColorPickerPopup from "../components/ColorPickerPopup";

function EditorPage() {
  const theme = useTheme();
  const topBarRef = useRef();
  const [minutesState] = useContext(MinutesContext);
  const [, updateEditor] = useContext(EditorContext);

  const styles = {
    app: {
      height: "100dvh",
      width: "100vw",
      overflowY: "auto",
      backgroundColor: theme.palette.background.main,
      display: "flex",
      flexDirection: "column",
    },
    topBar: {
      height: 80,
      flexShrink: 0,
    },
    body: {
      flexGrow: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  };

  useEffect(() => {
    const handleExistingMinutes = async () => {
      const { readToken, writeToken } = minutesState.metadata;
      const someTokenExists = Boolean(readToken || writeToken);
      if (!someTokenExists) {
        return;
      }

      const minutesResponse = await minutesService.getMinutesByToken(
        writeToken ?? readToken,
      );

      if (!_.isEqual(minutesState.minutes, minutesResponse.data)) {
        updateEditor({ reloadPopupAnchorElement: topBarRef.current });
      }
    };

    handleExistingMinutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={styles.app}>
      <Box sx={styles.topBar}>
        <TopBar containerRef={topBarRef} />
      </Box>
      <Box sx={styles.body}>
        <Editor />
      </Box>
      <Box sx={styles.footer}>
        <Footer />
      </Box>
      <SignatureModal />
      <PreviewPrintPDFModal />
      <SharePopup />
      <ReloadPopup />
      <LanguagePickerPopup />
      <ColorSettingsPopup />
      <ColorPickerPopup />
    </Box>
  );
}

export default EditorPage;
