import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import MinutesContext from "../contexts/MinutesContext";
import ImageElement from "./Image";

function Signature() {
  const [state] = useContext(MinutesContext);
  const [modifiedSignature, setModifiedSignature] = useState(null);

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

    timestampContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },

    signatureAndDateText: {
      color: state.minutes.colors.primary,
    },
  };

  const hexToRgb = (hex) => {
    const hexIsShort = hex.length === 4;
    const rgbRed = parseInt(hexIsShort ? hex[1] + hex[1] : hex[1] + hex[2], 16);
    const rgbGreen = parseInt(
      hexIsShort ? hex[2] + hex[2] : hex[3] + hex[4],
      16,
    );
    const rgbBlue = parseInt(
      hexIsShort ? hex[3] + hex[3] : hex[5] + hex[6],
      16,
    );
    return [rgbRed, rgbGreen, rgbBlue];
  };

  useEffect(() => {
    if (
      state.minutes.signatures.length > 0 &&
      state.minutes.signatures[0].image
    ) {
      const newSignature = new Image();
      newSignature.src = state.minutes.signatures[0].image;
      newSignature.onload = () => {
        const canvas = document.createElement("canvas");
        const canvasContext = canvas.getContext("2d");
        canvas.width = newSignature.width;
        canvas.height = newSignature.height;

        canvasContext.drawImage(newSignature, 0, 0);

        const canvasData = canvasContext.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        const { data } = canvasData;

        const [rgbRed, rgbGreen, rgbBlue] = hexToRgb(
          state.minutes.colors.primary,
        );

        for (let i = 0; i < data.length; i += 4) {
          // Only change non-transparent pixels
          if (data[i + 3] > 0) {
            data[i] = rgbRed;
            data[i + 1] = rgbGreen;
            data[i + 2] = rgbBlue;
          }
        }

        canvasContext.putImageData(canvasData, 0, 0);
        setModifiedSignature(canvas.toDataURL());
      };
    }
  }, [state.minutes.signatures, state.minutes.colors.primary]);

  return (
    <Box
      sx={styles.dateAndSignatureContainer}
      data-testid="signature-component"
    >
      <Box sx={styles.signatureContainer}>
        {state.minutes.signatures.length > 0 &&
          state.minutes.signatures[0].image && (
            <ImageElement
              src={modifiedSignature}
              sx={styles.signatureImage}
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
            <Box sx={styles.timestampContainer}>
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
