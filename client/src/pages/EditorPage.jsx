import { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
import Footer from "../components/Footer";
import SignatureModal from "../components/SignatureModal";
import EditorContext from "../contexts/EditorContext";

function EditorPage() {
  const theme = useTheme();
  const [editor] = useContext(EditorContext);

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
          <SideBar />
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
      <SignatureModal open={editor.isModalOpen} />
    </>
  );
}

export default EditorPage;
