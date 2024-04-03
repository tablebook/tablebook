import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F3C297",
      contrastText: "#000000",
    },
    secondary: {
      main: "#7E83A0",
      contrastText: "#ffffff",
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
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","), // default font
    header: {
      fontFamily: ["Lilita One", "sans-serif"].join(","),
      fontSize: "3.3rem",
    },
  },
  fontSizes: {
    xs: "0.8rem",
    s: "1rem",
    m: "1.5rem",
    l: "2rem",
  },
});

export default theme;
