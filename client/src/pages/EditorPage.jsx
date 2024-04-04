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
    body: {
      backgroundColor: theme.palette.background.main,
      display: "flex",
      justifyContent: "space-between",
      minWidth: 950,
    },
  };

  return (
    <>
      <TopBar />
      <Box sx={styles.body}>
        <SideBar />
        <Editor />
        <Box sx={{ width: "24vw" }} />
      </Box>
      <Footer />
      <SignatureModal />
      <SharePopup />
    </>
  );
}

export default EditorPage;
