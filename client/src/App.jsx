import { Box, useTheme } from "@mui/material";
import TopBar from "./components/TopBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Editor from "./components/Editor.jsx";
import Footer from "./components/Footer.jsx";
import SignatureModal from "./components/SignatureModal.jsx";

function App() {
  const theme = useTheme();

  const styles = {
    outerContainer: {
      backgroundColor: theme.palette.background.main,
      height: "100vh",
    },

    innerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
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
      <SignatureModal />
    </>
  );
}

export default App;
