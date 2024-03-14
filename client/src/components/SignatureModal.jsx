import { useRef } from "react";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

const SignatureModal = ({ open, onClose, onSave }) => {
  const theme = useTheme();
  const signaturePadRef = useRef(null);

  const styles = {
    modalStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: theme.palette.background.main,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 4,
      border: "2px solid black",
      borderRadius: 1,
    },

    canvasBox: {
      my: 4,
      bgcolor: theme.palette.paper.main,
    },

    buttonsBox: {
      display: "flex",
      width: 400,
      justifyContent: "space-between",
    },
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const getSignature = () => {
    if (signaturePadRef.current) {
      const dataURL = signaturePadRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      onSave(dataURL);
    } else {
      onSave(null);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="signature-modal">
      <Box sx={styles.modalStyle}>
        <Typography variant="h4">Draw your signature</Typography>
        <Box sx={styles.canvasBox}>
          <SignatureCanvas
            ref={signaturePadRef}
            dotSize={3}
            penColor={theme.palette.paper.contrastText}
            canvasProps={{
              width: 500,
              height: 200,
            }}
          />
        </Box>
        <Box sx={styles.buttonsBox}>
          <Button variant="contained" color="primary" onClick={clearSignature}>
            Clear
          </Button>
          <Button variant="contained" color="confirm" onClick={getSignature}>
            Confirm
          </Button>
          <Button variant="contained" color="delete" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignatureModal;
