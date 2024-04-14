import React, { useContext } from "react";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import moment from "moment";
import PDFDocument from "./PDFDocument";
import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";
import prepareMinutesForPDF from "../util/prepareMinutesForPDF";

function PreviewPrintPDFModal() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [minutesState] = useContext(MinutesContext);
  const [editor, updateEditor] = useContext(EditorContext);

  const pdfDocumentRatio = 2 / 3;

  const pdfDocumentHeight = "80dvh";
  const pdfDocumentWidth = `calc(${pdfDocumentHeight} * ${pdfDocumentRatio})`;

  const pdfReadyMinutes = prepareMinutesForPDF(minutesState);

  // Create the filename for downloaded PDF based on the minutes state and current timestamp
  const titleFirstWord = minutesState.minutes.name.split(" ")[0];
  const fileName = `${titleFirstWord}_${moment().format("YYYY-MM-DD")}.pdf`;

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

    mimicButtonMargins: {
      mx: 4,
      my: 1,
    },

    buttonStyle: {
      width: 100,
    },
  };

  const handlePrintPDF = (url) => {
    // Create a hidden iframe element
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      if (iframe.contentWindow && "print" in iframe.contentWindow) {
        iframe.contentWindow.print();
        iframe.contentWindow.onafterprint = () => {
          // Clear DOM and URL resource
          document.body.removeChild(iframe);
          URL.revokeObjectURL(url);
        };
      } else {
        // Clear DOM and URL resource
        document.body.removeChild(iframe);
        URL.revokeObjectURL(url);
      }
    };
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
            <PDFDocument pdfReadyMinutes={pdfReadyMinutes} />
          </PDFViewer>
        </Box>
        <Box sx={styles.buttonsContainer}>
          <Box sx={styles.mimicButtonMargins}>
            <BlobProvider
              document={<PDFDocument pdfReadyMinutes={pdfReadyMinutes} />}
            >
              {({ url, loading }) => (
                <Button
                  variant="contained"
                  color={loading ? "primary" : "secondary"}
                  onClick={loading ? undefined : () => handlePrintPDF(url)}
                  disabled={loading}
                  sx={styles.buttonStyle}
                >
                  {loading ? "Loading document" : "Print PDF"}
                </Button>
              )}
            </BlobProvider>
          </Box>
          <Box sx={styles.mimicButtonMargins}>
            <PDFDownloadLink
              document={<PDFDocument pdfReadyMinutes={pdfReadyMinutes} />}
              fileName={fileName}
            >
              {({ loading }) => (
                <Button
                  variant="contained"
                  color={loading ? "primary" : "secondary"}
                  disabled={loading}
                  sx={styles.buttonStyle}
                >
                  {loading ? "Loading document" : "Download PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </Box>
          <Button
            variant="contained"
            color="delete"
            onClick={handleModalClose}
            sx={styles.buttonStyle}
          >
            {t("closeWindow")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PreviewPrintPDFModal;
