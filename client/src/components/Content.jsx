import { InputBase } from "@mui/material";

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
    <>
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
    </>
  );
};

export default Content;
