import React, { useContext } from "react";
import { Box, InputBase } from "@mui/material";
import MinutesContext from "../contexts/MinutesContext";

function Segment({ segmentIndex }) {
  const [state, { updateMinutes }] = useContext(MinutesContext);

  const styles = {
    contentContainer: {
      width: 1000,
    },

    contentTitleText: {
      fontSize: "1.5rem",
      color: state.minutes.colors.primary,
    },

    contentTitleInput: {
      px: 4,
    },

    contentText: {
      fontSize: "1rem",
      color: state.minutes.colors.primary,
    },

    contentInput: {
      pl: 6,
      pr: 4,
    },
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    const newSegments = structuredClone(state.minutes.segments);
    newSegments[segmentIndex].name = newTitle;
    updateMinutes({ segments: newSegments });
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    const newSegments = structuredClone(state.minutes.segments);
    newSegments[segmentIndex].content = newContent;
    updateMinutes({ segments: newSegments });
  };

  return (
    <Box sx={styles.contentContainer} data-testid="segment-component">
      <InputBase
        name="contentTitle"
        placeholder="Enter the title"
        value={state.minutes.segments[segmentIndex].name}
        fullWidth
        inputProps={{ style: styles.contentTitleText }}
        sx={styles.contentTitleInput}
        onChange={handleTitleChange}
      />
      <InputBase
        name="content"
        placeholder="Enter the content"
        value={state.minutes.segments[segmentIndex].content}
        fullWidth
        multiline
        inputProps={{ style: styles.contentText }}
        sx={styles.contentInput}
        onChange={handleContentChange}
      />
    </Box>
  );
}

export default Segment;
