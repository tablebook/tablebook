import React, { useContext } from "react";
import { Box, InputBase } from "@mui/material";
import MinutesContext from "../contexts/MinutesContext";

function Title() {
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    updateMinutes({ name: newTitle });
  };

  const styles = {
    titleContainer: {
      width: 1000,
      my: 2,
    },

    titleText: {
      fontSize: "2rem",
      textAlign: "center",
      color: minutesState.minutes.colors.primary,
    },
  };

  return (
    <Box sx={styles.titleContainer}>
      <InputBase
        name="title"
        placeholder="Enter main title"
        value={minutesState.minutes.name}
        fullWidth
        inputProps={{ style: styles.titleText }}
        onChange={handleTitleChange}
      />
    </Box>
  );
}

export default Title;
