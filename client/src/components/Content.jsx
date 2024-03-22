import { useContext } from "react";
import { Box, InputBase } from "@mui/material";
import MinutesContext from "../contexts/MinutesContext.jsx";

const Content = () => {
  const [minutes, updateMinutes] = useContext(MinutesContext);

  const styles = {
    contentTitleText: {
      fontSize: "1.5rem",
      color: minutes.colors.primary,
    },

    contentTitleInput: {
      px: 4,
    },

    contentText: {
      fontSize: "1rem",
      color: minutes.colors.primary,
    },

    contentInput: {
      pl: 6,
      pr: 4,
    },
  };

  return (
    <Box data-testid="content-component">
      <InputBase
        name="contentTitle"
        placeholder="Enter the title"
        fullWidth
        inputProps={{ style: styles.contentTitleText }}
        sx={styles.contentTitleInput}
      />
      <InputBase
        name="content"
        placeholder="Enter the content"
        fullWidth
        multiline
        inputProps={{ style: styles.contentText }}
        sx={styles.contentInput}
      />
    </Box>
  );
};

export default Content;
