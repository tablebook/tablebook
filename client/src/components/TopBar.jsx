import { Box, Link, Button, useTheme } from "@mui/material";

const TopBar = () => {
  const theme = useTheme();

  const styles = {
    topBarContainer: {
      backgroundColor: theme.palette.primary.main,
      position: "fixed",
      width: "100vw",
      display: "flex",
      alignItems: "center",
    },

    topBarButton: {
      mx: 1.5,
    },

    logoLink: {
      px: 1,
    },

    buttonsBox: {
      display: "flex",
      width: "100vw",
      justifyContent: "end",
    },
  };

  return (
    <>
      <Box sx={styles.topBarContainer}>
        <Link
          href="/"
          variant="h3"
          color="primary.contrastText"
          underline="hover"
          sx={styles.logoLink}
        >
          TableBook
        </Link>

        <Box sx={styles.buttonsBox}>
          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
          >
            Create New
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
          >
            Revert
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
          >
            Share
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={styles.topBarButton}
          >
            Print PDF
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
