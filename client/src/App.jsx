import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import TopBar from "./components/TopBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Editor from "./components/Editor.jsx";
import Footer from "./components/Footer.jsx";
import SignatureModal from "./components/SignatureModal.jsx";
import SharePopup from "./components/SharePopup.jsx";

function App() {
  const theme = useTheme();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const styles = {
    outerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: theme.palette.background.main,
      height: "100dvh",
    },

    innerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "100dvh",
    },

    editorContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },

    sidebarImitation: {
      width: "20vw",
      minWidth: 280,
    },

    editorButtonsImitation: {
      width: "6.66vw",
      maxWidth: 200,
    },
  };
  return (
    <>
      <Box sx={styles.outerContainer}>
        <TopBar />
        <Box sx={styles.innerContainer}>
          <SideBar handleModalOpen={handleModalOpen} />
          <Box sx={styles.editorContainer}>
            <Editor />
            {/* mimics editor buttons to center the paper */}
            <Box sx={styles.editorButtonsImitation} />
          </Box>
          {/* mimics sideBar to center the paper */}
          <Box sx={styles.sidebarImitation} />
        </Box>
        <Footer />
      </Box>
      <SignatureModal open={isModalOpen} onClose={handleModalClose} />
      <SharePopup />
    </>
  );
}

export default App;
