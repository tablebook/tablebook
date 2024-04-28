import React, { useContext } from "react";
import { Box, Popover, useTheme } from "@mui/material";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useDebouncedCallback } from "use-debounce";

import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";
import useHandleSignatureAffectingChange from "../util/useHandleSignatureAffectingChange";

function ColorPickerPopup() {
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const [editorState, updateEditor] = useContext(EditorContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();
  const theme = useTheme();
  const setColor = useDebouncedCallback(
    // function
    (color) => {
      updateMinutes({
        colors: {
          ...minutesState.minutes.colors,
          [editorState.colorPickerPopupColor]: color,
        },
      });
    },
    // delay in ms
    2,
  );

  const selectedColor =
    minutesState.minutes.colors[editorState.colorPickerPopupColor];

  const styles = {
    container: {
      p: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      backgroundColor: selectedColor,
      width: 200,
    },
  };

  const isPopupOpen = Boolean(
    editorState.colorPickerPopupAnchorElement && selectedColor,
  );

  const closePopup = () =>
    updateEditor({
      colorPickerPopupAnchorElement: null,
    });

  const handlePickerClick = (event) => {
    if (!handleSignatureAffectingChange()) {
      event.stopPropagation();
    }
  };

  return (
    <Popover
      open={isPopupOpen}
      anchorEl={editorState.colorPickerPopupAnchorElement}
      onClose={closePopup}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={styles.container}>
        <HexColorPicker
          color={selectedColor}
          onChange={setColor}
          onMouseDownCapture={handlePickerClick}
          onTouchStartCapture={handlePickerClick}
        />
        <HexColorInput
          color={selectedColor}
          onChange={setColor}
          style={{
            textAlign: "center",
            fontSize: theme.fontSizes.m,
            border: 0,
            textTransform: "uppercase",
          }}
        />
      </Box>
    </Popover>
  );
}

export default ColorPickerPopup;
