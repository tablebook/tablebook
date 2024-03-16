import { Box, InputBase } from "@mui/material";

const Content = () => {
  const styles = {
    contentTitleText: {
      fontSize: "1.5rem",
    },

    contentTitleInput: {
      px: 4,
    },

    contentText: {
      fontSize: "1rem",
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
