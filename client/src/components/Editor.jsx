import React, { useContext } from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import EditorButtons from "./EditorButtons";
import Content from "./Content";
import Title from "./Title";
import MinutesContext from "../contexts/MinutesContext";
import SideContainer from "./SideContainer";

function Editor() {
  const [state] = useContext(MinutesContext);

  const styles = {
    editorContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "80dvh",
      width: "40vw",
      minWidth: 400,
      maxWidth: 1200,
      backgroundColor: state.minutes.colors.secondary,
    },

    segmentContainer: {
      display: "flex",
      flexDirection: "row",
    },

    contentContainer: {
      display: "flex",
      flexDirection: "column",
      width: 1000,
    },

    bottomContainer: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
    },

    bottomContentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
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
    <Box sx={styles.editorContainer}>
      <Box sx={styles.segmentContainer}>
        <SideContainer />
        <Title />
      </Box>

      {state.minutes.segments.map((segment, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box sx={styles.segmentContainer} key={index}>
          <SideContainer>
            <EditorButtons />
          </SideContainer>

          <Box sx={styles.contentContainer}>
            <Content segmentIndex={index} />
          </Box>
        </Box>
      ))}

      <Box sx={styles.bottomContainer}>
        <SideContainer />
        <Box sx={styles.bottomContentContainer}>
          <Box sx={styles.dateAndSignatureContainer}>
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
        </Box>
      </Box>
    </Box>
  );
}

export default Editor;
