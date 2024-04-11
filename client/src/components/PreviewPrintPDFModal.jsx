import React, { useContext } from "react";
import { Box, Modal, Button, useTheme } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
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
            <PDFDocument pdfReadyMinutes={prepareMinutesForPDF(minutesState)} />
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
