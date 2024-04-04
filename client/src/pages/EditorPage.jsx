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
      overflowY: "auto",
      backgroundColor: theme.palette.background.main,
      display: "flex",
      flexDirection: "column",
    },
    body: {
      display: "flex",
      justifyContent: "space-between",
      flexGrow: 1,
      minWidth: 950,
      overflowY: "auto",
    },
    scrollable: {
      flexGrow: 1,
      overflowY: "auto",
    },
  };

  return (
    <Box sx={styles.app}>
      <TopBar />
      <Box sx={styles.body}>
        <SideBar />
        <Box sx={styles.scrollable}>
          <Editor />
          <Box sx={{ width: "24vw" }} />
        </Box>
      </Box>
      <Footer />
      <SignatureModal />
      <SharePopup />
    </Box>
  );
}

export default EditorPage;
