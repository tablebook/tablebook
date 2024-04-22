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
      />
    </Box>
  );
}

export default Segment;
