import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import Html from "react-pdf-html";
import moment from "moment";
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf";
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";
import RobotoItalic from "../assets/fonts/Roboto-Italic.ttf";
import RobotoBoldItalic from "../assets/fonts/Roboto-BoldItalic.ttf";
import RobotoMonoRegular from "../assets/fonts/RobotoMono-Regular.ttf";

function PDFDocument({ pdfReadyMinutes }) {
  const { t } = useTranslation();

  Font.register({
    family: "Roboto",
    fonts: [
      { src: RobotoRegular },
      { src: RobotoBold, fontWeight: "bold" },
      { src: RobotoItalic, fontStyle: "italic" },
      {
        src: RobotoBoldItalic,
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });

  Font.register({
    family: "RobotoMono",
    src: RobotoMonoRegular,
  });

  // Crear default margins and paddings from html tags
  const stylesheet = {
    p: {
      margin: 0,
      padding: 0,
    },
    h1: {
      margin: 0,
      padding: 0,
    },
    h2: {
      margin: 0,
      padding: 0,
    },
    h3: {
      margin: 0,
      padding: 0,
    },
    h4: {
      margin: 0,
      padding: 0,
    },
    h5: {
      margin: 0,
      padding: 0,
    },
    h6: {
      margin: 0,
      padding: 0,
    },
    div: {
      margin: 0,
      padding: 0,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      margin: 0,
      padding: 0,
    },
    ol: {
      margin: 0,
      padding: 0,
    },
    blockquote: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      backgroundColor: "#f0f0f0",
      borderLeft: "5px solid #ccc",
    },
    pre: {
      margin: 5,
      padding: 5,
      fontFamily: "RobotoMono",
    },
    ".delStyle": {
      textDecoration: "line-through",
    },
    ".codeStyle": {
      fontFamily: "RobotoMono",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    ".preCodeStyle": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      border: "1px solid black",
      borderRadius: "4px",
    },
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: pdfReadyMinutes.colors.secondary,
      color: pdfReadyMinutes.colors.primary,
      padding: 30,
    },

    minutesContent: {
      flexGrow: 1,
    },

    titleText: {
      fontSize: 36,
      textAlign: "center",
      marginBottom: 40,
      fontFamily: "Roboto",
    },

    section: {
      marginBottom: 40,
    },

    contentTitleText: {
      fontSize: 24,
      paddingBottom: 12,
      paddingLeft: 10,
      fontFamily: "Roboto",
    },

    contentText: {
      fontSize: 16,
      paddingLeft: 20,
      fontFamily: "Roboto",
    },

    signatureAndDateContainer: {
      flexDirection: "row",
      marginTop: 20,
      justifyContent: "space-between",
      minHeight: 75,
    },

    signatureContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-end",
    },

    dateContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },

    timestampContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },

    signatureImage: {
      width: 150,
      height: 60,
      objectFit: "scale-down",
      objectPosition: "0 100%",
    },

    signatureAndDateLine: {
      width: 150,
      borderTop: `1 solid ${pdfReadyMinutes.colors.primary}`,
    },

    signatureAndDateText: {
      fontSize: 24,
    },
  });

  return (
    <Document creator="TableBook" producer="TableBook">
      <Page size="A4" style={styles.page}>
        <View style={styles.minutesContent}>
          <Html stylesheet={stylesheet} style={styles.titleText}>
            {pdfReadyMinutes.name}
          </Html>
          {pdfReadyMinutes.segments.map((segment) => (
            <View key={segment.id} style={styles.section}>
              <Html stylesheet={stylesheet} style={styles.contentTitleText}>
                {segment.name}
              </Html>
              <Html stylesheet={stylesheet} style={styles.contentText}>
                {segment.content}
              </Html>
            </View>
          ))}
        </View>
        {pdfReadyMinutes.signatures.map((signature) => (
          <View key={signature.id} style={styles.signatureAndDateContainer}>
            <View style={styles.signatureContainer}>
              {Boolean(signature.image) && (
                <Image src={signature.image} style={styles.signatureImage} />
              )}

              <View style={styles.signatureAndDateLine} />
              {Boolean(signature.signer) && (
                <Text style={styles.signatureAndDateText}>
                  {signature.signer}
                </Text>
              )}
              <Text style={styles.signatureAndDateText}>{t("signature")}</Text>
            </View>
            <View style={styles.dateContainer}>
              {Boolean(signature.timestamp) && (
                <View style={styles.timestampContainer}>
                  <Text style={styles.signatureAndDateText}>
                    {moment.utc(signature.timestamp).format("YYYY-MM-DD")}
                  </Text>
                  <Text style={styles.signatureAndDateText}>
                    {moment.utc(signature.timestamp).format("HH:mm z")}
                  </Text>
                </View>
              )}
              <View style={styles.signatureAndDateLine} />
              <Text style={styles.signatureAndDateText}>{t("date")}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default PDFDocument;
