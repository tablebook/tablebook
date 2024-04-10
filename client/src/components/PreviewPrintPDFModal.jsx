import React, { useContext } from "react";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { PDFViewer, Font } from "@react-pdf/renderer";
import { marked } from "marked";
import DOMPurify from "dompurify";
import PDFDocument from "./PDFDocument";
import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";
import RobotoMonoRegular from "../assets/fonts/RobotoMono-Regular.ttf";

Font.register({
  family: "RobotoMono",
  src: RobotoMonoRegular,
});

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

  const preprocessMarkdown = (markdown) => {
    // Escape input tags
    const preprocessedMarkdown = markdown
      .replace(/\[ \]/g, "\\[ \\]")
      .replace(/\[x\]/gi, "\\[x\\]");

    return preprocessedMarkdown;
  };

  const transformAndStyleHtml = (html) => {
    const processedHTML = html
      // Apply line-through style for <del> tags
      .replace(
        /<del>(.*?)<\/del>/g,
        (_, content) =>
          `<span style="text-decoration: line-through;">${content}</span>`,
      )
      // Apply backticks around <code> tags
      .replace(
        /<code>(.*?)<\/code>/g,
        (_, content) =>
          `<p style="font-family: RobotoMono; background-color: rgba(0, 0, 0, 0.1);">${content}</p>`,
      )
      // Apply three backticks around <pre><code> tag combos
      .replace(
        /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
        (_, content) =>
          `<p style="font-family: RobotoMono; background-color: rgba(0, 0, 0, 0.1);">${content}</p>`,
      );

    return processedHTML;
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
      "code",
      "pre",
      "b",
      "strong",
      "i",
      "em",
      "del",
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
    name: transformAndStyleHtml(
      DOMPurify.sanitize(
        marked.parse(preprocessMarkdown(minutesState.minutes.name)),
        sanitizeConfig,
      ),
    ),
    segments: minutesState.minutes.segments.map((segment) => ({
      name: transformAndStyleHtml(
        DOMPurify.sanitize(
          marked.parse(preprocessMarkdown(segment.name)),
          sanitizeConfig,
        ),
      ),
      content: transformAndStyleHtml(
        DOMPurify.sanitize(
          marked.parse(preprocessMarkdown(segment.content)),
          sanitizeConfig,
        ),
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
