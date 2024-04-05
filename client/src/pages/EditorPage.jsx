import { Box, useTheme } from "@mui/material";
import React from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
import Footer from "../components/Footer";
import SharePopup from "../components/SharePopup";
import SignatureModal from "../components/SignatureModal";

function EditorPage() {
  const theme = useTheme();

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
      height: 30,
    },
    scrollable: {
      flexGrow: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "row",
    },
  };

  return (
    <Box sx={styles.app}>
      <Box sx={styles.topBar}>
        <TopBar />
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
      <SharePopup />
    </Box>
  );
}

export default EditorPage;
