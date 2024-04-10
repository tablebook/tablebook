import React, { useContext } from "react";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { marked } from "marked";
import DOMPurify from "dompurify";
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

  const sanitizeConfig = {
    ALLOWED_TAGS: [
      "br",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "div",
      "ul",
      "li",
      "ol",
      "blockquote",
      "pre",
      "b",
      "strong",
      "i",
      "em",
      "a",
      "img",
      "table",
      "tbody",
      "tr",
      "td",
      "th",
      "thead",
      "tfoot",
    ],
    ALLOWED_ATTR: ["href", "title", "target", "src", "alt", "width", "height"],
  };

  const parsedMinutes = {
    // Copy over the styles and other properties that don't need parsing
    name: DOMPurify.sanitize(
      marked.parse(minutesState.minutes.name),
      sanitizeConfig,
    ),
    segments: minutesState.minutes.segments.map((segment) => ({
      name: DOMPurify.sanitize(marked.parse(segment.name), sanitizeConfig),
      content: DOMPurify.sanitize(
        marked.parse(segment.content),
        sanitizeConfig,
      ),
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
