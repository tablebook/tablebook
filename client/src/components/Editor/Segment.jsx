import React, { useContext } from "react";
import { Box, InputBase, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function Segment({ segmentIndex }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();

  const styles = {
    contentContainer: {
      width: 1000,
      mb: 2,
    },

    contentTitleText: {
      fontSize: theme.fontSizes.m,
      color: minutesState.minutes.colors.primary,
    },

    contentTitleInput: {
      px: 4,
    },

    contentText: {
      fontSize: theme.fontSizes.s,
      color: minutesState.minutes.colors.primary,
    },

    contentInput: {
      pl: 6,
      pr: 4,
    },
  };

  const handleTitleChange = (event) => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

    const newTitle = event.target.value;
    const newSegments = structuredClone(minutesState.minutes.segments);
    newSegments[segmentIndex].name = newTitle;
    updateMinutes({ segments: newSegments });
  };

  const handleContentChange = (event) => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

    const newContent = event.target.value;
    const newSegments = structuredClone(minutesState.minutes.segments);
    newSegments[segmentIndex].content = newContent;
    updateMinutes({ segments: newSegments });
  };

  const handleTabPress = (event) => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

    const { value, selectionStart, selectionEnd } = event.target;
    const newValue = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;

    const newSegments = structuredClone(minutesState.minutes.segments);
    newSegments[segmentIndex].content = newValue;
    updateMinutes({ segments: newSegments });

    // Calculate the new cursor position after inserting spaces
    const cursorPosition = selectionStart + 1;

    // using setTimeout to ensure that the cursor goes to the right place
    setTimeout(() => {
      event.target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (
    <Box sx={styles.contentContainer} data-testid="segment-component">
      <InputBase
        name="contentTitle"
        placeholder={t("enterTheTitle")}
        value={minutesState.minutes.segments[segmentIndex].name}
        fullWidth
        inputProps={{
          style: styles.contentTitleText,
          readOnly: minutesState.metadata.writeAccess === false,
        }}
        sx={styles.contentTitleInput}
        onChange={handleTitleChange}
      />
      <InputBase
        name="content"
        placeholder={t("enterTheContent")}
        value={minutesState.minutes.segments[segmentIndex].content}
        fullWidth
        multiline
        inputProps={{
          style: styles.contentText,
          readOnly: minutesState.metadata.writeAccess === false,
        }}
        sx={styles.contentInput}
        onChange={handleContentChange}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            handleTabPress(event);
          }
        }}
      />
    </Box>
  );
}

export default Segment;
