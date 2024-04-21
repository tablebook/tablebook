import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function SegmentButtons({ segmentIndex }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();

  const styles = {
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
      mb: 2,
    },

    iconButton: {
      padding: 0,
    },

    iconSize: {
      fontSize: theme.fontSizes.l,
    },
  };

  const handleDelete = () => {
    const segment = minutesState.minutes.segments[segmentIndex];
    const isNameEmpty = segment.name.trim() === "";
    const isContentEmpty = segment.content.trim() === "";

    if (
      !(isNameEmpty && isContentEmpty) &&
      !window.confirm(t("deleteSegment"))
    ) {
      return;
    }

    if (!handleSignatureAffectingChange()) {
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

    if (!handleSignatureAffectingChange()) {
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

    if (!handleSignatureAffectingChange()) {
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
        <KeyboardArrowUpIcon sx={styles.iconSize} />
      </IconButton>

      <IconButton
        size="small"
        sx={styles.iconButton}
        onClick={handleDelete}
        data-testid="deleteButton"
      >
        <DeleteIcon sx={styles.iconSize} />
      </IconButton>

      <IconButton
        size="small"
        sx={styles.iconButton}
        onClick={handleMoveDown}
        data-testid="downButton"
      >
        <KeyboardArrowDownIcon sx={styles.iconSize} />
      </IconButton>
    </Box>
  );
}

export default SegmentButtons;
