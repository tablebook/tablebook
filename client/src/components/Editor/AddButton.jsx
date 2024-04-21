import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AddButton({ onClick, children }) {
  const theme = useTheme();

  const styles = {
    addButtonContainer: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },

    addButton: {
      display: "flex",
      flexDirection: "column",
    },

    addButtonIcon: {
      fontSize: theme.fontSizes.l,
    },
  };

  return (
    <Box sx={styles.addButtonContainer}>
      <IconButton sx={styles.addButton} onClick={onClick}>
        <AddCircleIcon sx={styles.addButtonIcon} />
        <Typography>{children}</Typography>
      </IconButton>
    </Box>
  );
}

export default AddButton;
