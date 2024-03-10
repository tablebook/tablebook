import { styled, Box, Link, Button } from "@mui/material";

const TopBar = () => {
  const TopBarContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
  }));

  const TopBarButton = styled(Button)(() => ({
    marginRight: "2%",
  }));

  const logoLink = {
    paddingLeft: "1%",
    paddingRight: "1%",
  };

  const buttonsBox = {
    display: "flex",
    width: "100%",
    justifyContent: "end",
  };

  return (
    <>
      <TopBarContainer>
        <Link
          href="/"
          variant="h3"
          color="primary.contrastText"
          underline="hover"
          sx={logoLink}
        >
          TableBook
        </Link>
        <Box sx={buttonsBox}>
          <TopBarButton variant="contained" color="secondary">
            Create New
          </TopBarButton>

          <TopBarButton variant="contained" color="secondary">
            Revert
          </TopBarButton>

          <TopBarButton variant="contained" color="secondary">
            Save
          </TopBarButton>

          <TopBarButton variant="contained" color="secondary">
            Share
          </TopBarButton>

          <TopBarButton variant="contained" color="secondary">
            Print PDF
          </TopBarButton>
        </Box>
      </TopBarContainer>
    </>
  );
};

export default TopBar;
