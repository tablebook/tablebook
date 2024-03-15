import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { HexColorPicker, HexColorInput } from "react-colorful";

const ColorPicker = ({ initialColor }) => {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialColor);

    const popover = useRef();
    const smallbox = useRef();
  
    const handleColorChange = (color) => {
      setSelectedColor(color);
    };
  
    const toggleColorPicker = () => {
        setIsColorPickerOpen(!isColorPickerOpen);
    };

    useEffect(() => {
            let handler = (event) => {
                if (popover.current && 
                    !popover.current.contains(event.target) && 
                    !smallbox.current.contains(event.target)) 
                {
                    setIsColorPickerOpen(false);
                }
            };
            document.addEventListener("mousedown", handler);
            return() => {
                document.removeEventListener("mousedown", handler);
            };
    }, []);
    
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
      <Box>
        <Box
          ref={smallbox}
          onClick={toggleColorPicker}
          style={styles.colorPickerBox}
        />
        {isColorPickerOpen && (
            <Box sx={styles.colorPicker} ref={popover}>
                <HexColorPicker color={selectedColor} onChange={handleColorChange} />
                <HexColorInput color={selectedColor} onChange={handleColorChange} />
            </Box>
            )}
      </Box>
    );
  };

export default ColorPicker;
  