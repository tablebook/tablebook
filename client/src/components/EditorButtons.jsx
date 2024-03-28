import React from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";

function EditorButtons() {
  const styles = {
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
    },

    iconButton: {
      padding: 0,
    },
  };

  return (
    <Box sx={styles.buttonsContainer} data-testid="editor-buttons">
      <IconButton size="small" sx={styles.iconButton} data-testid="upButton">
        <KeyboardArrowUpIcon fontSize="large" />
      </IconButton>

      <IconButton
        size="small"
        sx={styles.iconButton}
        data-testid="deleteButton"
      >
        <DeleteIcon fontSize="large" />
      </IconButton>

      <IconButton
        size="small"
        sx={{ ...styles.iconButton, mb: 2 }}
        data-testid="downButton"
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default EditorButtons;
