import React, { useContext } from "react";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { marked } from "marked";
import PDFDocument from "./PDFDocument";
import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";

function PreviewPrintPDFModal() {
  const theme = useTheme();
  const [minutesState] = useContext(MinutesContext);
  const [editor, updateEditor] = useContext(EditorContext);

  const pdfDocumentRatio = 2 / 3;

  const pdfDocumentHeight = "80dvh";
  const pdfDocumentWidth = `calc(${pdfDocumentHeight} * ${pdfDocumentRatio})`;

  const styles = {
    modalStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: theme.palette.background.main,
      p: 2,
    },

    pdfViewerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    pdfViewerStyle: {
      width: pdfDocumentWidth,
      height: pdfDocumentHeight,
    },

    buttonsContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& > Button": {
        mx: 4,
        my: 1,
      },
    },
  };

  const parsedMinutes = {
    // Copy over the styles and other properties that don't need parsing
    name: marked.parse(minutesState.minutes.name),
    segments: minutesState.minutes.segments.map((segment) => ({
      name: marked.parse(segment.name),
      content: marked.parse(segment.content),
    })),
  };

  const handleModalClose = () => {
    updateEditor({ isPreviewPrintPDFModalOpen: false });
  };

  return (
    <Modal
      open={editor.isPreviewPrintPDFModalOpen}
      onClose={handleModalClose}
      aria-labelledby="pdf-preview-modal"
    >
      <Box sx={styles.modalStyle}>
        <Box sx={styles.pdfViewerContainer}>
          <PDFViewer style={styles.pdfViewerStyle}>
            <PDFDocument
              minutesState={minutesState}
              parsedMinutes={parsedMinutes}
            />
          </PDFViewer>
        </Box>
        <Box sx={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleModalClose}
          >
            Close window
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PreviewPrintPDFModal;
