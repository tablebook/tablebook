import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawIcon from "@mui/icons-material/Draw";
import { useTranslation } from "react-i18next";
import EditorContext from "../../contexts/EditorContext";
import MinutesContext from "../../contexts/MinutesContext";

function SignatureButtons({ signatureIndex }) {
  const theme = useTheme();
  const { t } = useTranslation();

  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const [, updateEditor] = useContext(EditorContext);

  const styles = {
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
    },

    iconButton: {
      padding: 0,
    },

    iconSize: {
      fontSize: theme.fontSizes.l,
    },
  };

  const handleDelete = () => {
    const signature = minutesState.minutes.signatures[signatureIndex];
    const isSignatureEmpty =
      !signature.image && !signature.signer && !signature.timestamp;

    if (!isSignatureEmpty && !window.confirm(t("deleteSignature"))) {
      return;
    }

    const newSignatures = structuredClone(minutesState.minutes.signatures);
    newSignatures.splice(signatureIndex, 1);
    updateMinutes({ signatures: newSignatures });
  };

  const handleSignButtonClick = () => {
    updateEditor({
      isSignatureModalOpen: true,
      signatureIndex,
    });
  };

  return (
    <Box sx={styles.buttonsContainer} data-testid="signature-buttons">
      <IconButton
        size="small"
        onClick={handleDelete}
        sx={styles.iconButton}
        data-testid="deleteButton"
      >
        <DeleteIcon sx={styles.iconSize} />
      </IconButton>

      <IconButton
        size="small"
        title={t("sign")}
        onClick={handleSignButtonClick}
        sx={styles.iconButton}
        data-testid="signButton"
      >
        <DrawIcon sx={styles.iconSize} />
      </IconButton>
    </Box>
  );
}

export default SignatureButtons;
