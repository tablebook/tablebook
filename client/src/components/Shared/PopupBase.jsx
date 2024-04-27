import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function PopupBase({ title, children }) {
  const theme = useTheme();
  const styles = {
    outerContainer: {
      display: "flex",
      flexDirection: "column",
    },
    innerContainer: {
      p: 3,
      width: { xs: "auto", md: 400 },
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    header: {
      textAlign: "center",
      backgroundColor: theme.palette.background.main,
      p: 1,
      fontSize: theme.fontSizes.m,
    },
  };

  return (
    <Box sx={styles.outerContainer}>
      <Typography sx={styles.header}>{title}</Typography>
      <Box sx={styles.innerContainer}>{children}</Box>
    </Box>
  );
}

export default PopupBase;
