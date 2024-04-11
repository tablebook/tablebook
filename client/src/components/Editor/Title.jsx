import React, { useContext } from "react";
import { Box, InputBase, useTheme } from "@mui/material";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function Title() {
  const theme = useTheme();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();

  const handleTitleChange = (event) => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

    const newTitle = event.target.value;
    updateMinutes({ name: newTitle });
  };

  const styles = {
    titleContainer: {
      width: 1000,
      my: 2,
    },

    titleText: {
      fontSize: theme.fontSizes.l,
      textAlign: "center",
      color: minutesState.minutes.colors.primary,
    },
  };

  return (
    <Box sx={styles.titleContainer} data-testid="title-component">
      <InputBase
        name="title"
        placeholder="Enter main title"
        value={minutesState.minutes.name}
        fullWidth
        inputProps={{
          style: styles.titleText,
          readOnly: minutesState.metadata.writeAccess === false,
        }}
        onChange={handleTitleChange}
      />
    </Box>
  );
}

export default Title;
