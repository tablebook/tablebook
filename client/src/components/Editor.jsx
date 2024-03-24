import { useContext } from "react";
import { Box, useTheme, Typography, InputBase } from "@mui/material";
import EditorButtons from "./EditorButtons.jsx";
import Content from "./Content.jsx";
import MinutesContext from "../contexts/MinutesContext.jsx";

const Editor = () => {
  const theme = useTheme();
  const [state, updateMinutes] = useContext(MinutesContext);

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
      color: state.minutes.colors.primary,
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
      borderTop: `2px solid`,
      color: state.minutes.colors.primary,
      width: 170,
    },

    dateContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },

    dateText: {
      color: state.minutes.colors.primary,
    },
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    updateMinutes({ name: newTitle });
  };

  return (
    <Box sx={styles.editorContainer}>
      <Box sx={styles.segmentContainer}>
        <Box sx={styles.sideContainer}></Box>
        <Box sx={styles.titleContainer}>
          <InputBase
            name="title"
            placeholder="Enter main title"
            value={state.minutes.name}
            fullWidth
            inputProps={{ style: styles.titleText }}
            onChange={handleTitleChange}
          />
        </Box>
      </Box>

      {state.minutes.segments.map((segment, index) => (
        <Box sx={styles.segmentContainer} key={index}>
          <Box sx={styles.sideContainer}>
            <EditorButtons />
          </Box>

          <Box sx={styles.contentContainer}>
            <Content segmentIndex={index} />
          </Box>
        </Box>
      ))}

      <Box sx={styles.bottomContainer}>
        <Box sx={styles.sideContainer}></Box>
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
              <Typography variant="h5" sx={styles.signatureLine}>
                Signature
              </Typography>
            </Box>
            <Box sx={styles.dateContainer}>
              <Typography variant="h5" sx={styles.dateText}>
                Date
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Editor;
