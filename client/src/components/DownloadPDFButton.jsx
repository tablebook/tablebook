import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";
import MinutesContext from "../contexts/MinutesContext";
import PDFDocument from "./PDFDocument";
import prepareMinutesForPDF from "../util/prepareMinutesForPDF";

function DownloadPDFButton({ variant, color, sx }) {
  const { t } = useTranslation();
  const [minutesState] = useContext(MinutesContext);
  const [PDFInstance, updatePDFInstance] = usePDF({
    document: (
      <PDFDocument pdfReadyMinutes={prepareMinutesForPDF(minutesState)} />
    ),
  });
  const [triggerPDFDownload, setTriggerPDFDownload] = useState(false);

  useEffect(() => {
    if (PDFInstance.error)
      toast.error(t("errorInPDFGeneration"), {
        toastId: "PDF-Document-Error",
      });
  }, [PDFInstance.error, t]);

  const handlePDFDownload = () => {
    updatePDFInstance(
      <PDFDocument pdfReadyMinutes={prepareMinutesForPDF(minutesState)} />,
    );
    setTriggerPDFDownload(true);
  };

  // Downloads PDF only after the PDFInstance is updated
  useEffect(() => {
    if (
      triggerPDFDownload &&
      PDFInstance.url &&
      !PDFInstance.loading &&
      !PDFInstance.error
    ) {
      const link = document.createElement("a");
      link.href = PDFInstance.url;

      // Create the filename for downloaded PDF based on the minutes title and current timestamp
      const minutesTitle =
        minutesState.minutes.name.trim().replace(/\s+/g, "_") || t("minutes");
      const fileName = `${minutesTitle}_${moment().format("YYYY-MM-DD")}.pdf`;

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTriggerPDFDownload(false);
    }
  }, [
    PDFInstance.url,
    PDFInstance.loading,
    PDFInstance.error,
    triggerPDFDownload,
    minutesState.minutes.name,
    t,
  ]);

  return (
    // eslint-disable-next-line no-nested-ternary
    PDFInstance.error ? (
      <Button
        data-testid="download-pdf-button-error"
        variant="contained"
        disabled
        sx={sx}
      >
        {t("errorInPDFGeneration")}
      </Button>
    ) : PDFInstance.loading ? (
      <Button
        data-testid="download-pdf-button"
        variant="contained"
        disabled
        sx={sx}
      >
        {t("loadingDocument")}
      </Button>
    ) : (
      <Button
        data-testid="download-pdf-button"
        variant={variant}
        color={color}
        onClick={handlePDFDownload}
        sx={sx}
      >
        {t("downloadPDF")}
      </Button>
    )
  );
}

export default DownloadPDFButton;
