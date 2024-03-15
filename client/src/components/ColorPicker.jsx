import { useState, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { HexColorPicker, HexColorInput } from "react-colorful";

const ColorPicker = ({ initialColor }) => {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialColor);
  
    const handleColorChange = (color) => {
      setSelectedColor(color);
    };
  
    const toggleColorPicker = () => {
        setIsColorPickerOpen(!isColorPickerOpen);
    };

    const useClickOutside = () => {

    };

    const styles = {
        colorPickerBox: {
            backgroundColor: selectedColor,
            border: 10,
            position: "relative",
            width: 24,
            height: 24,
            cursor: "pointer",
            borderRadius: 5,
        },
        colorPicker: {
            position: "absolute",
            zIndex: "999",
        }
    }
  
    return (
      <div>
        <Box
          onClick={toggleColorPicker}
          style={styles.colorPickerBox}
        />
        {isColorPickerOpen && (
            <Box sx={styles.colorPicker}>
                <HexColorPicker color={selectedColor} onChange={handleColorChange} />
                <HexColorInput color={selectedColor} onChange={handleColorChange} />
            </Box>
            )}
      </div>
    );
  };

export default ColorPicker;
  