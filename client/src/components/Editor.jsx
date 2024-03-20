import { Box, useTheme, Typography, InputBase } from "@mui/material";
import EditorButtons from "./EditorButtons.jsx";
import Content from "./Content.jsx";

const Editor = ({ signatureImage }) => {
  const theme = useTheme();

  const styles = {
    editorContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "80dvh",
      width: "40vw",
      minWidth: 400,
      maxWidth: 1200,
      backgroundColor: theme.palette.paper.main,
    },

    segmentContainer: {
      display: "flex",
      flexDirection: "row",
    },

    sideContainer: {
      width: 200,
      backgroundColor: theme.palette.background.main,
    },

    contentContainer: {
      display: "flex",
      flexDirection: "column",
      width: 1000,
    },

    titleContainer: {
      width: 1000,
      my: 2,
    },

    titleText: {
      fontSize: "2rem",
      textAlign: "center",
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
      px: 4,
      pb: 2,
    },

    signatureContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-end",
    },

    signatureImage: {
      maxHeight: 40,
      maxWidth: 160,
      objectFit: "contain",
      alignSelf: "flex-start",
    },

    signatureLine: {
      borderTop: "2px solid black",
      width: 170,
    },

    dateContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  };

  return (
    <Box sx={styles.editorContainer}>
      <Box sx={styles.segmentContainer}>
        <Box sx={styles.sideContainer}></Box>
        <Box sx={styles.titleContainer}>
          <InputBase
            name="title"
            placeholder="Enter main title"
            fullWidth
            inputProps={{ style: styles.titleText }}
          />
        </Box>
      </Box>

      <Box sx={styles.segmentContainer}>
        <Box sx={styles.sideContainer}>
          <EditorButtons />
        </Box>

        <Box sx={styles.contentContainer}>
          <Content />
        </Box>
      </Box>

      <Box sx={styles.bottomContainer}>
        <Box sx={styles.sideContainer}></Box>
        <Box sx={styles.bottomContentContainer}>
          <Box sx={styles.dateAndSignatureContainer}>
            <Box sx={styles.signatureContainer}>
              {signatureImage && (
                <Box
                  sx={styles.signatureImage}
                  component="img"
                  src={signatureImage}
                  alt="Signature"
                />
              )}
              <Typography variant="h5" sx={styles.signatureLine}>
                Signature
              </Typography>
            </Box>
            <Box sx={styles.dateContainer}>
              <Typography variant="h5">Date</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Editor;
