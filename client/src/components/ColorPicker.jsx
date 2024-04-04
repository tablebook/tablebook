import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { HexColorPicker, HexColorInput } from "react-colorful";

function ColorPicker({ onColorChange, currColor }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const popover = useRef();
  const smallbox = useRef();

  const handleColorChange = (color) => {
    onColorChange(color);
  };

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  useEffect(() => {
    const handler = (event) => {
      if (
        popover.current &&
        !popover.current.contains(event.target) &&
        !smallbox.current.contains(event.target)
      ) {
        setIsColorPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const styles = {
    colorPickerBox: {
      backgroundColor: currColor,
      border: 1,
      position: "relative",
      width: 24,
      height: 24,
      cursor: "pointer",
      borderRadius: 1.5,
    },
    colorPicker: {
      position: "absolute",
      left: "92%",
    },
    colorPickerMap: {
      width: 150,
      height: 150,
      border: "1px solid black",
      borderRadius: "10px",
    },
    colorPickerInput: {
      marginTop: 3,
      marginLeft: 44,
      width: 60,
      borderRadius: 5,
      border: "1px solid black",
    },
  };

  return (
    <Box>
      <Box
        ref={smallbox}
        onClick={toggleColorPicker}
        sx={styles.colorPickerBox}
        data-testid="color-picker-box"
      />
      {isColorPickerOpen && (
        <Box sx={styles.colorPicker} ref={popover}>
          <HexColorPicker
            color={currColor}
            onChange={handleColorChange}
            style={styles.colorPickerMap}
            data-testid="color-picker"
          />
          <HexColorInput
            color={currColor}
            onChange={handleColorChange}
            style={styles.colorPickerInput}
          />
        </Box>
      )}
    </Box>
  );
}

export default ColorPicker;
