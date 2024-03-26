import React, { useRef, useState, useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  InputBase,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";

const SignatureModal = ({ open }) => {
  const theme = useTheme();
  const [, { updateMinutes }] = useContext(MinutesContext);
  const [, updateEditor] = useContext(EditorContext);
  const [signer, setSigner] = useState("");
  const [isChecked, setIsChecked] = useState(true);
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

  const handleModalClose = () => {
    setSigner("");
    setIsChecked(true);
    updateEditor({ isModalOpen: false });
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const getSignature = () => {
    const timestamp = isChecked ? new Date().toISOString() : null;
    const image = !signaturePadRef.current.isEmpty()
      ? signaturePadRef.current.getTrimmedCanvas().toDataURL("image/png")
      : null;
    updateMinutes({
      signatures: [
        {
          signer,
          timestamp,
          image,
        },
      ],
    });
    handleModalClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="signature-modal"
    >
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
        <Box sx={styles.signerContainer}>
          <InputBase
            name="signer"
            placeholder="Enter name clarification"
            fullWidth
            inputProps={{ style: styles.signerText }}
            onChange={(e) => setSigner(e.target.value)}
          />
        </Box>
        <Box sx={styles.timestampContainer}>
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            sx={styles.timestampCheckboxStyle}
          />
          <Typography>Insert current date on minutes</Typography>
        </Box>
        <Box sx={styles.buttonsBox}>
          <Button variant="contained" color="primary" onClick={clearSignature}>
            Clear
          </Button>
          <Button variant="contained" color="confirm" onClick={getSignature}>
            Confirm
          </Button>
          <Button variant="contained" color="delete" onClick={handleModalClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignatureModal;
