import React, { useContext, useEffect } from "react";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
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
  const pdfReadyMinutes = prepareMinutesForPDF(minutesState);

  const [PDFInstance, updatePDFInstance] = usePDF({
    document: <PDFDocument pdfReadyMinutes={pdfReadyMinutes} />,
  });

  const pdfDocumentRatio = 2 / 3;

  const pdfDocumentHeight = "80dvh";
  const pdfDocumentWidth = `calc(${pdfDocumentHeight} * ${pdfDocumentRatio})`;

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
    },

    buttonStyle: {
      width: 100,
      mx: 4,
      my: 1,
    },
  };

  // Update usePDF hooks document when module is opened
  useEffect(() => {
    if (editor.isPreviewPrintPDFModalOpen === true) {
      updatePDFInstance(<PDFDocument pdfReadyMinutes={pdfReadyMinutes} />);
    }
  }, [editor.isPreviewPrintPDFModalOpen, pdfReadyMinutes, updatePDFInstance]);

  useEffect(() => {
    if (PDFInstance.error)
      toast.error("Error generating PDF document", {
        toastId: "PDF-Document-Error",
      });
  }, [PDFInstance.error]);

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

  const normalState = (
    <Box sx={styles.buttonsContainer}>
      <Button
        data-testid="print-pdf-button"
        variant="contained"
        color="secondary"
        onClick={() => handlePrintPDF(PDFInstance.url)}
        sx={styles.buttonStyle}
      >
        Print PDF
      </Button>
      <Button
        data-testid="download-pdf-button"
        variant="contained"
        color="secondary"
        href={PDFInstance.url}
        download={fileName}
        sx={styles.buttonStyle}
      >
        Download PDF
      </Button>
      <Button
        variant="contained"
        color="delete"
        onClick={handleModalClose}
        sx={styles.buttonStyle}
      >
        {t("closeWindow")}
      </Button>
    </Box>
  );

  const loadingState = (
    <Box sx={styles.buttonsContainer}>
      <Button
        data-testid="print-pdf-button"
        variant="contained"
        color="primary"
        disabled
        sx={styles.buttonStyle}
      >
        Loading document
      </Button>
      <Button
        data-testid="download-pdf-button"
        variant="contained"
        color="primary"
        disabled
        sx={styles.buttonStyle}
      >
        Loading document
      </Button>
      <Button
        variant="contained"
        color="delete"
        onClick={handleModalClose}
        sx={styles.buttonStyle}
      >
        {t("closeWindow")}
      </Button>
    </Box>
  );

  const errorState = (
    <Box sx={styles.buttonsContainer}>
      <Button
        data-testid="print-pdf-button-error"
        variant="contained"
        disabled
        sx={styles.buttonStyle}
      >
        Error in PDF generating
      </Button>
      <Button
        data-testid="download-pdf-button-error"
        variant="contained"
        disabled
        sx={styles.buttonStyle}
      >
        Error in PDF generating
      </Button>
      <Button
        variant="contained"
        color="delete"
        onClick={handleModalClose}
        sx={styles.buttonStyle}
      >
        {t("closeWindow")}
      </Button>
    </Box>
  );

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
        {/* eslint-disable-next-line no-nested-ternary */}
        {PDFInstance.error
          ? errorState
          : PDFInstance.loading
            ? loadingState
            : normalState}
      </Box>
    </Modal>
  );
}

export default PreviewPrintPDFModal;
