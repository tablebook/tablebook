import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7E83A0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F3C297",
      contrastText: "#000000",
    },
    background: {
      main: "#FFE3BE",
      contrastText: "#000000",
    },
    delete: {
      main: "#F53C3C",
      contrastText: "#000000",
    },
    confirm: {
      main: "#00FF1A",
      contrastText: "#000000",
    },
    paper: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    footer: {
      main: "#6c645d",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
