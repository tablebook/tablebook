import {
  Box,
  Button,
  InputAdornment,
  Popover,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import LinkIcon from "@mui/icons-material/Link";

import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";

function SharePopup() {
  const theme = useTheme();
  const [editorState, updateEditor] = useContext(EditorContext);
  const [minutesState] = useContext(MinutesContext);

  const isPopupOpen = Boolean(editorState.sharePopupAnchorElement);
  const closePopup = () => updateEditor({ sharePopupAnchorElement: null });

  const styles = {
    outerContainer: {
      display: "flex",
      flexDirection: "column",
    },
    innerContainer: {
      p: 3,
      width: 400,
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    header: {
      textAlign: "center",
      backgroundColor: theme.palette.background.main,
      p: 1,
      fontSize: theme.fontSizes.l,
    },
  };

  const handleCopyUrl = (event) => {
    const inputElement =
      event.currentTarget.parentElement.parentElement.querySelector("input");
    const inputElementValue = inputElement.value;

    inputElement.focus();
    inputElement.select();

    navigator.clipboard.writeText(inputElementValue);
  };

  const inputProps = {
    readOnly: true,
    endAdornment: (
      <InputAdornment position="end">
        <Button variant="contained" onClick={handleCopyUrl}>
          <LinkIcon />
        </Button>
      </InputAdornment>
    ),
  };

  const baseUrl = `${window.location.origin}/minutes/`;

  return (
    <Popover
      open={isPopupOpen}
      anchorEl={editorState.sharePopupAnchorElement}
      onClose={closePopup}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={styles.outerContainer}>
        <Typography sx={styles.header}>Share</Typography>
        <Box sx={styles.innerContainer}>
          {minutesState.metadata.readToken && (
            <>
              <Typography>Read link</Typography>
              <TextField
                data-testid="read-only-link"
                value={baseUrl + (minutesState.metadata.readToken ?? "")}
                InputProps={inputProps}
              />
            </>
          )}
          {minutesState.metadata.writeToken && (
            <>
              <Typography>Edit link</Typography>
              <TextField
                data-testid="write-link"
                value={baseUrl + (minutesState.metadata.writeToken ?? "")}
                InputProps={inputProps}
              />
            </>
          )}
        </Box>
      </Box>
    </Popover>
  );
}

export default SharePopup;
