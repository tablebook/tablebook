import React, { useContext } from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import MinutesContext from "../contexts/MinutesContext";

function SegmentButtons({ segmentIndex }) {
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);

  const styles = {
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
    },

    iconButton: {
      padding: 0,
    },
  };

  const handleDelete = () => {
    if (
      !window.confirm(
        "This action will delete the segment and its content. Are you sure?",
      )
    ) {
      return;
    }
    const newSegments = structuredClone(minutesState.minutes.segments);
    newSegments.splice(segmentIndex, 1);
    updateMinutes({ segments: newSegments });
  };

  const handleMoveUp = () => {
    // do nothing if its the first segment
    if (segmentIndex === 0) {
      return;
    }

    const newSegments = structuredClone(minutesState.minutes.segments);

    [newSegments[segmentIndex], newSegments[segmentIndex - 1]] = [
      newSegments[segmentIndex - 1],
      newSegments[segmentIndex],
    ];

    updateMinutes({ segments: newSegments });
  };

  const handleMoveDown = () => {
    // do nothing if its the last segment
    if (segmentIndex === minutesState.minutes.segments.length - 1) {
      return;
    }

    const newSegments = structuredClone(minutesState.minutes.segments);

    [newSegments[segmentIndex], newSegments[segmentIndex + 1]] = [
      newSegments[segmentIndex + 1],
      newSegments[segmentIndex],
    ];

    updateMinutes({ segments: newSegments });
  };

  return (
    <Box sx={styles.buttonsContainer} data-testid="segment-buttons">
      <IconButton
        size="small"
        sx={styles.iconButton}
        onClick={handleMoveUp}
        data-testid="upButton"
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </IconButton>

      <IconButton
        size="small"
        sx={styles.iconButton}
        onClick={handleDelete}
        data-testid="deleteButton"
      >
        <DeleteIcon fontSize="large" />
      </IconButton>

      <IconButton
        size="small"
        sx={{ ...styles.iconButton, mb: 2 }}
        onClick={handleMoveDown}
        data-testid="downButton"
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default SegmentButtons;
