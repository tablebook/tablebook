import React, { useContext } from "react";
import { Box, Button, useTheme } from "@mui/material";
import ColorPickerContainer from "./ColorPickerContainer";
import LanguagePickerContainer from "./LanguagePickerContainer";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";

function SideBar() {
  const theme = useTheme();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const [, updateEditor] = useContext(EditorContext);

  const styles = {
    sideBarContainer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      width: "20vw",
      minWidth: 280,
      alignItems: "center",
      justifyContent: "center",
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      width: 180,
      mt: 3,
      mb: 5,
    },

    sideBarButton: {
      p: 2,
      m: 2,
      border: 0.5,
    },
  };

  const handleAddField = () => {
    const newSegments = [
      ...minutesState.minutes.segments,
      {
        name: "",
        content: "",
      },
    ];
    updateMinutes({ segments: newSegments });
  };

  return (
    <Box sx={styles.sideBarContainer}>
      <ColorPickerContainer />

      <LanguagePickerContainer />

      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddField}
          sx={styles.sideBarButton}
        >
          Add a field
        </Button>

        <Button
          variant="contained"
          color="secondary"
          sx={styles.sideBarButton}
          onClick={() => updateEditor({ isSignatureModalOpen: true })}
        >
          Sign
        </Button>

        <Button variant="contained" color="secondary" sx={styles.sideBarButton}>
          Preview
        </Button>
      </Box>
    </Box>
  );
}

export default SideBar;
