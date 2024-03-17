import { Box, Button, Link, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  const styles = {
    footerContainer: {
      backgroundColor: theme.palette.footer.main,
      position: "fixed",
      bottom: 0,
      width: "100vw",
      display: "flex",
      justifyContent: "center",
    },

    linkContainer: {
      width: "30vw",
      display: "flex",
      justifyContent: "space-between",
    },

    buttonStyle: {
      textTransform: "none",
      color: "footer.contrastText",
      "&:hover": {
        textDecoration: "underline",
        backgroundColor: "transparent",
      },
    },

    linkStyle: {
      p: 1,
    },
  };

  return (
    <Box sx={styles.footerContainer}>
      <Box sx={styles.linkContainer}>
        <Button sx={styles.buttonStyle}>
          <Typography variant="h5">Report</Typography>
        </Button>
        <Link
          href={"https://github.com/tablebook/tablebook"}
          variant="h5"
          color="footer.contrastText"
          underline="hover"
          sx={styles.linkStyle}
        >
          GitHub
        </Link>
        <Button sx={styles.buttonStyle}>
          <Typography variant="h5">Copyright</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
