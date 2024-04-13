import React, { useContext } from "react";
import { Box, Button, useTheme } from "@mui/material";
import ColorPickerContainer from "./ColorPickerContainer";
import MinutesContext from "../../contexts/MinutesContext";
import EditorContext from "../../contexts/EditorContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function SideBar() {
  const theme = useTheme();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const [, updateEditor] = useContext(EditorContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();

  const styles = {
    sideBarContainer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      width: "20vw",
      minWidth: 240,
      alignItems: "center",
      overflow: "auto",
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      width: "75%",
      maxWidth: 240,
    },

    sideBarButton: {
      p: 1.5,
      m: 1.5,
      fontSize: theme.fontSizes.s,
    },
  };

  const handleAddField = () => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

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
      {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
        <ColorPickerContainer />
      )}

      <Box sx={styles.buttonContainer}>
        {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
}

export default SideBar;
