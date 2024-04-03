import React from "react";
import { Box, Link, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  const theme = useTheme();

  const styles = {
    footerContainer: {
      backgroundColor: theme.palette.footer.main,
      width: "100vw",
      display: "flex",
      justifyContent: "center",
    },

    linkContainer: {
      width: "40vw",
      display: "flex",
      justifyContent: "space-between",
    },

    linkStyle: {
      p: 1,
      width: 150,
      textAlign: "center",
      fontSize: theme.fontSizes.s
    },
  };

  return (
    <Box sx={styles.footerContainer}>
      <Box sx={styles.linkContainer}>
        <Link
          component={RouterLink}
          to="https://github.com/tablebook/tablebook/issues/new"
          variant="h5"
          color="footer.contrastText"
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.linkStyle}
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
          sx={styles.linkStyle}
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
          sx={styles.linkStyle}
        >
          Copyright
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
