import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Link, useTheme, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import GitHubIcon from "@mui/icons-material/GitHub";
import CopyrightIcon from "@mui/icons-material/Copyright";

function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  const styles = {
    footerContainer: {
      backgroundColor: theme.palette.footer.main,
      display: "flex",
      justifyContent: "space-evenly",
      pt: 0.5,
    },
    footerItem: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
    itemText: {
      fontSize: theme.fontSizes.xxs,
    },
  };

  return (
    <Box sx={styles.footerContainer}>
      <Box sx={styles.footerItem}>
        <Link
          component={RouterLink}
          to="https://github.com/tablebook/tablebook/issues/new"
          color="primary.contrastText"
          underline="hover"
        >
          <ReportIcon />
          <Typography sx={styles.itemText}>{t("reportAnIssue")}</Typography>
        </Link>
      </Box>

      <Box sx={styles.footerItem}>
        <Link
          component={RouterLink}
          to="https://github.com/tablebook/tablebook"
          color="primary.contrastText"
          underline="hover"
        >
          <GitHubIcon />
          <Typography sx={styles.itemText}>GitHub</Typography>
        </Link>
      </Box>

      <Box sx={styles.footerItem}>
        <Link
          component={RouterLink}
          to="https://github.com/tablebook/tablebook/blob/main/LICENSE"
          color="primary.contrastText"
          underline="hover"
        >
          <CopyrightIcon sx={styles.iconSize} />
          <Typography sx={styles.itemText}>Copyright</Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
