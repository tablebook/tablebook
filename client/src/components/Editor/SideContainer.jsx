import React from "react";
import { Box, useTheme } from "@mui/material";

function SideContainer({ children }) {
  const theme = useTheme();

  const styles = {
    sideContainer: {
      width: 120,
      flexShrink: 0,
      backgroundColor: theme.palette.background.main,
    },
  };

  return <Box sx={styles.sideContainer}>{children}</Box>;
}

export default SideContainer;
