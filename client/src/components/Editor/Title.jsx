import React, { useContext } from "react";
import { Box, InputBase, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import MinutesContext from "../../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";

function Title() {
  const theme = useTheme();
  const { t } = useTranslation();
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
      width: "100%",
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
        placeholder={t("enterTheMainTitle")}
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
