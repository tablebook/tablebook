import React from "react";
import { Box, Link, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  const theme = useTheme();

  const styles = {
    footerContainer: {
      backgroundColor: theme.palette.footer.main,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: "100%",
    },

    footerItem: {
      fontSize: theme.fontSizes.s,
    },
  };

  return (
    <Box sx={styles.footerContainer}>
      <Link
        component={RouterLink}
        to="https://github.com/tablebook/tablebook/issues/new"
        variant="h5"
        color="footer.contrastText"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={styles.footerItem}
      >
        Report an issue
      </Link>
      <Link
        component={RouterLink}
        to="https://github.com/tablebook/tablebook"
        variant="h5"
        color="footer.contrastText"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={styles.footerItem}
      >
        GitHub
      </Link>
      <Link
        component={RouterLink}
        to="https://github.com/tablebook/tablebook/blob/main/LICENSE"
        variant="h5"
        color="footer.contrastText"
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={styles.footerItem}
      >
        Copyright
      </Link>
    </Box>
  );
}

export default Footer;
