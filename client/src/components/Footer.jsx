import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Link, useTheme, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import GitHubIcon from "@mui/icons-material/GitHub";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MarkdownIcon from "./Shared/MarkdownIcon";

function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  const styles = {
    footerContainer: {
      backgroundColor: theme.palette.footer.main,
      display: "flex",
      justifyContent: "space-evenly",
      py: 0.5,
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
          target="_blank"
          data-testid="reportButton"
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
          target="_blank"
          data-testid="gitHubButton"
        >
          <GitHubIcon />
          <Typography sx={styles.itemText}>GitHub</Typography>
        </Link>
      </Box>

      <Box sx={styles.footerItem}>
        <Link
          component={RouterLink}
          to="https://www.markdownguide.org/basic-syntax/"
          color="primary.contrastText"
          underline="hover"
          target="_blank"
          data-testid="markdownButton"
        >
          <MarkdownIcon height={24} />
          <Typography sx={styles.itemText}>Markdown</Typography>
        </Link>
      </Box>

      <Box sx={styles.footerItem}>
        <Link
          component={RouterLink}
          to="https://github.com/tablebook/tablebook/blob/main/LICENSE"
          color="primary.contrastText"
          underline="hover"
          target="_blank"
          data-testid="copyrightButton"
        >
          <CopyrightIcon />
          <Typography sx={styles.itemText}>Copyright</Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
