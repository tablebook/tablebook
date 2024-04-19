import { Box, useTheme } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import _ from "lodash";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar/SideBar";
import Editor from "../components/Editor/Editor";
import Footer from "../components/Footer";
import SharePopup from "../components/SharePopup";
import SignatureModal from "../components/SignatureModal";
import PreviewPrintPDFModal from "../components/PreviewPrintPDFModal";
import ReloadPopup from "../components/ReloadPopup";
import EditorContext from "../contexts/EditorContext";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";

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
      display: "flex",
      justifyContent: "space-between",
      flexGrow: 1,
      overflowY: "auto",
    },
    footer: {
      height: 46,
    },
    scrollable: {
      flexGrow: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "row",
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
        <SideBar />
        <Box sx={styles.scrollable}>
          <Editor />
          <Box sx={{ width: "24vw" }} />
        </Box>
      </Box>
      <Box sx={styles.footer}>
        <Footer />
      </Box>
      <SignatureModal />
      <PreviewPrintPDFModal />
      <SharePopup />
      <ReloadPopup />
    </Box>
  );
}

export default EditorPage;
