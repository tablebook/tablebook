import React, { useRef, useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Checkbox,
  InputBase,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SignatureCanvas from "react-signature-canvas";
import MinutesContext from "../contexts/MinutesContext";
import EditorContext from "../contexts/EditorContext";

function SignatureModal() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [state, { updateMinutes }] = useContext(MinutesContext);
  const [editor, updateEditor] = useContext(EditorContext);
  const [signer, setSigner] = useState("");
  const [timestampIsChecked, setTimestampIsChecked] = useState(true);
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
      bgcolor: state.minutes.colors.secondary,
      border: "1px solid black",
    },

    signerContainer: {
      width: 500,
      bgcolor: state.minutes.colors.secondary,
      border: "1px solid black",
    },

    signerText: {
      fontSize: theme.fontSizes.l,
      textAlign: "center",
    },

    signerTextColor: {
      color: state.minutes.colors.primary,
      "& .MuiInputBase-input::placeholder": {
        color: state.minutes.colors.primary,
      },
      "& .MuiInputBase-input": {
        caretColor: state.minutes.colors.primary,
      },
    },

    timestampContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      my: 4,
    },

    timestampCheckboxStyle: {
      color: theme.palette.primary.contrastText,
      "&.Mui-checked": {
        color: theme.palette.primary.contrastText,
      },
    },

    buttonsBox: {
      display: "flex",
      width: 400,
      justifyContent: "space-between",
    },
  };

  const handleModalClose = () => {
    setSigner("");
    setTimestampIsChecked(true);
    updateEditor({ isSignatureModalOpen: false });
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const getSignature = () => {
    const timestamp = timestampIsChecked ? new Date().toISOString() : null;
    const image = !signaturePadRef.current.isEmpty()
      ? signaturePadRef.current.getTrimmedCanvas().toDataURL("image/png")
      : null;

    const signature = state.minutes.signatures[editor.signatureIndex];
    const isSignatureEmpty =
      !signature.image && !signature.signer && !signature.timestamp;

    if (!isSignatureEmpty) {
      if (!window.confirm(t("overrideSignature"))) {
        return;
      }
    }

    const newSignatures = structuredClone(state.minutes.signatures);
    newSignatures[editor.signatureIndex] = {
      id: uuid(),
      signer,
      timestamp,
      image,
    };
    updateMinutes({ signatures: newSignatures });
    handleModalClose();
  };

  return (
    <Modal
      open={editor.isSignatureModalOpen}
      onClose={handleModalClose}
      aria-labelledby="signature-modal"
    >
      <Box sx={styles.modalStyle}>
        <Typography variant="h4">{t("drawYourSignature")}</Typography>
        <Box sx={styles.canvasBox}>
          <SignatureCanvas
            ref={signaturePadRef}
            dotSize={3}
            penColor={state.minutes.colors.primary}
            canvasProps={{
              width: 500,
              height: 200,
            }}
          />
        </Box>
        <Box sx={styles.signerContainer}>
          <InputBase
            name="signer"
            placeholder={t("enterNameClarification")}
            fullWidth
            inputProps={{ style: styles.signerText }}
            sx={styles.signerTextColor}
            onChange={(e) => setSigner(e.target.value)}
          />
        </Box>
        <Box sx={styles.timestampContainer}>
          <Checkbox
            checked={timestampIsChecked}
            onChange={(e) => setTimestampIsChecked(e.target.checked)}
            sx={styles.timestampCheckboxStyle}
            inputProps={{ "data-testid": "timestamp-checkbox" }}
          />
          <Typography>{t("insertCurrentTimestampOnMinutes")}</Typography>
        </Box>
        <Box sx={styles.buttonsBox}>
          <Button variant="contained" color="primary" onClick={clearSignature}>
            {t("clear")}
          </Button>
          <Button variant="contained" color="confirm" onClick={getSignature}>
            {t("confirm")}
          </Button>
          <Button variant="contained" color="delete" onClick={handleModalClose}>
            {t("cancel")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SignatureModal;
