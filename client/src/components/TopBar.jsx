import { Box, Link, Button, useTheme, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import EditorContext from "../contexts/EditorContext";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";
import logoImage from "../assets/images/logo.png";
import Image from "./Image";

function TopBar() {
  const theme = useTheme();
  const [, updateEditor] = useContext(EditorContext);
  const [minutesState, { updateMetadata, clearState }] =
    useContext(MinutesContext);

  const styles = {
    topBarContainer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
    },

    titleText: {
      display: { xs: "none", md: "block" },
    },

    topBarButton: {
      mx: 1.5,
      fontSize: theme.fontSizes.s,
    },

    buttonContainer: {
      display: "flex",
      overflow: "auto",
      px: 1,
    },

    titleContainer: {
      display: "flex",
      backgroundColor: theme.palette.background.main,
      height: 60,
      borderRadius: 9,
      boxShadow: 3,
      px: 2,
      ml: 1,
    },

    statusMessageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.background.main,
      px: 2,
      borderRadius: 1,
    },

    statusMessage: {
      textAlign: "center",
    },
  };

  const handleCreateNewClicked = () => {
    if (
      !window.confirm(
        "This action will clear the whole document. Are you sure?",
      )
    ) {
      return;
    }

    clearState();
  };

  const handleShareClicked = async (event) => {
    const shareButton = event.currentTarget;

    const isAlreadyStored =
      minutesState.metadata.writeToken || minutesState.metadata.readToken;

    if (isAlreadyStored) {
      updateEditor({ sharePopupAnchorElement: shareButton });
      return;
    }

    if (
      !window.confirm(
        "This action will store the document in the cloud where it will be accessible to anyone with the provided link. Are you sure?",
      )
    ) {
      return;
    }

    const createdMinutes = await minutesService.createMinutes(
      minutesState.minutes,
    );

    updateMetadata({
      writeAccess: true,
      writeToken: createdMinutes.writeToken,
      readToken: createdMinutes.readToken,
    });

    updateEditor({ sharePopupAnchorElement: shareButton });
  };

  const handleSaveClicked = async () => {
    try {
      await minutesService.updateMinutesByToken(
        minutesState.metadata.writeToken,
        minutesState.minutes,
      );

      alert("Minutes saved successfully!");
    } catch (error) {
      alert("Saving minutes failed");
    }
  };

  const getStatusMessage = () => {
    switch (minutesState.metadata.writeAccess) {
      case null:
        return "Minutes not stored";
      case true:
        return "Editing stored minutes";
      case false:
        return "Reading stored minutes";
      default:
        return "Unknown state";
    }
  };

  return (
    <Box sx={styles.topBarContainer}>
      <Link
        component={RouterLink}
        to="/minutes"
        underline="hover"
        color="primary.contrastText"
      >
        <Box sx={styles.titleContainer}>
          <Image src={logoImage} />
          <Typography sx={styles.titleText} variant="header">
            TableBook
          </Typography>
        </Box>
      </Link>

      <Box sx={styles.buttonContainer}>
        <Box sx={styles.statusMessageContainer}>
          <Typography color="background.contrastText">
            {getStatusMessage()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={styles.topBarButton}
          onClick={handleCreateNewClicked}
        >
          Create New
        </Button>

        {minutesState.metadata.writeAccess && (
          <>
            <Button
              variant="contained"
              color="secondary"
              sx={styles.topBarButton}
              onClick={handleSaveClicked}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={styles.topBarButton}
            >
              Revert
            </Button>
          </>
        )}

        <Button
          variant="contained"
          color="secondary"
          sx={styles.topBarButton}
          onClick={handleShareClicked}
        >
          Share
        </Button>

        <Button variant="contained" color="secondary" sx={styles.topBarButton}>
          Print PDF
        </Button>
      </Box>
    </Box>
  );
}

export default TopBar;
