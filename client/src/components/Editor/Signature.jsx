import React, { useContext } from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import MinutesContext from "../../contexts/MinutesContext";
import ImageElement from "../Shared/Image";

function Signature({ signatureIndex }) {
  const { t } = useTranslation();
  const [state] = useContext(MinutesContext);

  const styles = {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      width: 1000,
    },

    dateAndSignatureContainer: {
      display: "flex",
      flexDirection: "row",
      pb: 2,
    },

    signatureContainer: {
      display: "flex",
      flexDirection: "column",
      pl: 2,
    },

    signatureImage: {
      maxHeight: 40,
      maxWidth: 150,
      objectFit: "contain",
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
      flex: 1,
      justifyContent: "flex-end",
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
  };

  return (
    <Box sx={styles.mainContainer} data-testid="signature-component">
      <Box sx={styles.dateAndSignatureContainer}>
        <Box sx={styles.signatureContainer}>
          {state.minutes.signatures[signatureIndex].image && (
            <ImageElement
              src={state.minutes.signatures[signatureIndex].image}
              sx={styles.signatureImage}
              alt="Signature"
            />
          )}

          <Box sx={styles.signatureAndDateLine} />

          {state.minutes.signatures[signatureIndex].signer && (
            <Typography variant="h5" sx={styles.signatureAndDateText}>
              {state.minutes.signatures[signatureIndex].signer}
            </Typography>
          )}

          <Typography variant="h5" sx={styles.signatureAndDateText}>
            {t("signature")}
          </Typography>
        </Box>

        <Box sx={styles.dateContainer}>
          {state.minutes.signatures[signatureIndex].timestamp && (
            <Box sx={styles.timestampContainer}>
              <Typography variant="h5" sx={styles.signatureAndDateText}>
                {moment
                  .utc(state.minutes.signatures[signatureIndex].timestamp)
                  .format("YYYY-MM-DD")}
              </Typography>
              <Typography variant="h5" sx={styles.signatureAndDateText}>
                {moment
                  .utc(state.minutes.signatures[signatureIndex].timestamp)
                  .format("HH:mm z")}
              </Typography>
            </Box>
          )}

          <Box sx={styles.signatureAndDateLine} />

          <Typography variant="h5" sx={styles.signatureAndDateText}>
            {t("date")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Signature;
