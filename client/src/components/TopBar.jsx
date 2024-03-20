import { Box, Link, Button, useTheme, Typography } from "@mui/material";

const TopBar = () => {
  const theme = useTheme();

  const styles = {
    topBarContainer: {
      backgroundColor: theme.palette.primary.main,
      width: "100vw",
      height: 80,
      display: "flex",
      alignItems: "center",
    },

    topBarButton: {
      mx: 1.5,
    },

    buttonsBox: {
      display: "flex",
      width: "100vw",
      justifyContent: "end",
    },

    titleContainer: {
      display: "flex",
      backgroundColor: theme.palette.background.main,
      height: 60,
      borderRadius: 9,
      boxShadow: 3,
      pl: 2,
      pr: 4,
      ml: 2,
    },
  };

  return (
    <>
      <Box sx={styles.topBarContainer}>
        <Link href="/" underline="hover" color="primary.contrastText">
          <Box sx={styles.titleContainer}>
            <Box component="img" src="/images/logo.png" />
            <Typography variant="h3">TableBook</Typography>
          </Box>
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
