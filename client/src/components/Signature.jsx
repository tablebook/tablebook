import React, { useContext } from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import MinutesContext from "../contexts/MinutesContext";

function Signature() {
  const [state] = useContext(MinutesContext);
  const styles = {
    dateAndSignatureContainer: {
      display: "flex",
      flexDirection: "row",
      pb: 2,
    },

    signatureContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-end",
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

    signatureAndDateText: {
      color: state.minutes.colors.primary,
    },
  };

  return (
    <Box
      sx={styles.dateAndSignatureContainer}
      data-testid="signature-component"
    >
      <Box sx={styles.signatureContainer}>
        {state.minutes.signatures.length > 0 &&
          state.minutes.signatures[0].image && (
            <Box
              sx={styles.signatureImage}
              component="img"
              src={state.minutes.signatures[0].image}
              alt="Signature"
            />
          )}

        <Box sx={styles.signatureAndDateLine} />

        {state.minutes.signatures.length > 0 &&
          state.minutes.signatures[0].signer && (
            <Typography variant="h5" sx={styles.signatureAndDateText}>
              {state.minutes.signatures[0].signer}
            </Typography>
          )}

        <Typography variant="h5" sx={styles.signatureAndDateText}>
          Signature
        </Typography>
      </Box>

      <Box sx={styles.dateContainer}>
        {state.minutes.signatures.length > 0 &&
          state.minutes.signatures[0].timestamp && (
            <Box sx={styles.dateContainer}>
              <Typography variant="h5" sx={styles.signatureAndDateText}>
                {moment
                  .utc(state.minutes.signatures[0].timestamp)
                  .format("YYYY-MM-DD")}
              </Typography>
              <Typography variant="h5" sx={styles.signatureAndDateText}>
                {moment
                  .utc(state.minutes.signatures[0].timestamp)
                  .format("HH:mm")}
              </Typography>
            </Box>
          )}

        <Box sx={styles.signatureAndDateLine} />

        <Typography variant="h5" sx={styles.signatureAndDateText}>
          Date
        </Typography>
      </Box>
    </Box>
  );
}

export default Signature;
