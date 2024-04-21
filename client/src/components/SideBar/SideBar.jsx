import React, { useContext } from "react";
import { Box, useTheme } from "@mui/material";

import ColorPickerContainer from "./ColorPickerContainer";
import MinutesContext from "../../contexts/MinutesContext";

function SideBar() {
  const theme = useTheme();
  const [minutesState] = useContext(MinutesContext);

  const styles = {
    sideBarContainer: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      width: "20vw",
      minWidth: 240,
      alignItems: "center",
      overflow: "auto",
    },

    buttonContainer: {
      mt: 14,
      display: "flex",
      flexDirection: "column",
      width: "85%",
      maxWidth: 240,
    },

    sideBarButton: {
      p: 1.5,
      m: 1.5,
      fontSize: theme.fontSizes.s,
    },
  };

  return (
    <Box sx={styles.sideBarContainer}>
      {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
        <ColorPickerContainer />
      )}
    </Box>
  );
}

export default SideBar;
