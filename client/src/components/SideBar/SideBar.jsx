import React, { useContext } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ColorPickerContainer from "./ColorPickerContainer";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function SideBar() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
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
      mt: 14,
      display: "flex",
      flexDirection: "column",
      width: "85%",
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

  const handleAddSignatureField = () => {
    const newSignatures = [
      ...minutesState.minutes.signatures,
      {
        image: null,
        signer: "",
        timestamp: null,
      },
    ];

    updateMinutes({ signatures: newSignatures });
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
              {t("addAField")}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={styles.sideBarButton}
              onClick={handleAddSignatureField}
            >
              {t("addSignatureField")}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default SideBar;
