import React, { useContext } from "react";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { marked } from "marked";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import PDFDocument from "./PDFDocument";
import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";

function PreviewPrintPDFModal() {
  const theme = useTheme();
  const { t } = useTranslation();
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
      // Create newlines on one enter press inside <p> tags
      .replace(
        /<p>(.*?)<\/p>/gs,
        (_, content) => `<p>${content.replace(/\n/g, "<br>")}</p>`,
      )
      // Apply line-through style for <del> tags
      .replace(
        /<del>(.*?)<\/del>/g,
        (_, content) => `<span class="delStyle">${content}</span>`,
      )
      // Apply backticks around <code> tags
      .replace(
        /<code>(.*?)<\/code>/g,
        (_, content) => `<span class="codeStyle">${content}</span>`,
      )
      // Apply three backticks around <pre><code> tag combos
      .replace(
        /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
        (_, content) => `<pre class="preCodeStyle">${content}</pre>`,
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
    name: transformAndStyleHtml(
      DOMPurify.sanitize(
        marked.parse(preprocessMarkdown(minutesState.minutes.name)),
        sanitizeConfig,
      ),
    ),
    colors: minutesState.minutes.colors,
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
    signatures: minutesState.minutes.signatures,
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
            <PDFDocument parsedMinutes={parsedMinutes} />
          </PDFViewer>
        </Box>
        <Box sx={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleModalClose}
          >
            {t("closeWindow")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PreviewPrintPDFModal;
