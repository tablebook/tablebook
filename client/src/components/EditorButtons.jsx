import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";

const EditorButtons = () => {
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
    <Box sx={styles.buttonsContainer}>
      <IconButton size="small" sx={styles.iconButton}>
        <KeyboardArrowUpIcon fontSize="large" />
      </IconButton>

      <IconButton size="small" sx={styles.iconButton}>
        <DeleteIcon fontSize="large" />
      </IconButton>

      <IconButton size="small" sx={{ ...styles.iconButton, mb: 2 }}>
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default EditorButtons;
