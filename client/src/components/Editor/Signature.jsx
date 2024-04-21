import React, { useContext } from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MinutesContext from "../../contexts/MinutesContext";
import ImageElement from "../Shared/Image";

function Signature({ signatureIndex }) {
  const { t } = useTranslation();
  const [state] = useContext(MinutesContext);

  const signature = state.minutes.signatures[signatureIndex];

  const styles = {
    mainContainer: {
      flexGrow: 1,
      minHeight: 50,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      py: 1.5,
    },

    signatureContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      pl: 2,
    },

    signatureImage: {
      maxHeight: 60,
      maxWidth: 150,
      alignSelf: "flex-start",
    },

    signatureAndDateLine: {
      borderTop: `2px solid`,
      color: state.minutes.colors.primary,
      width: 150,
    },

    dateContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      alignItems: "flex-end",
      pr: 2,
    },

    timestampContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },

    signatureAndDateText: {
      color: state.minutes.colors.primary,
    },

    imageContainer: {
      height: 60,
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
    },
  };

  return (
    <Box sx={styles.mainContainer} data-testid="signature-component">
      <Box sx={styles.signatureContainer}>
        <Box sx={styles.imageContainer}>
          {signature.image && (
            <ImageElement
              src={signature.image}
              sx={styles.signatureImage}
              alt="Signature"
            />
          )}
        </Box>

        <Box sx={styles.signatureAndDateLine} />

        {signature.signer && (
          <Typography variant="h5" sx={styles.signatureAndDateText}>
            {signature.signer}
          </Typography>
        )}

        <Typography variant="h5" sx={styles.signatureAndDateText}>
          {t("signature")}
        </Typography>
      </Box>

      <Box sx={styles.dateContainer}>
        {signature.timestamp && (
          <Box sx={styles.timestampContainer}>
            <Typography variant="h5" sx={styles.signatureAndDateText}>
              {moment.utc(signature.timestamp).format("YYYY-MM-DD")}
            </Typography>
            <Typography variant="h5" sx={styles.signatureAndDateText}>
              {moment.utc(signature.timestamp).format("HH:mm z")}
            </Typography>
          </Box>
        )}

        <Box sx={styles.signatureAndDateLine} />

        <Typography variant="h5" sx={styles.signatureAndDateText}>
          {t("date")}
        </Typography>
      </Box>
    </Box>
  );
}

export default Signature;
