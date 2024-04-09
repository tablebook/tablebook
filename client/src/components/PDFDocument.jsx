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
import Html from "react-pdf-html";
import moment from "moment";
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf";
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";
import RobotoItalic from "../assets/fonts/Roboto-Italic.ttf";
import RobotoBoldItalic from "../assets/fonts/Roboto-BoldItalic.ttf";

function PDFDocument({ minutesState, parsedMinutes }) {
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
      paddingTop: 0,
      paddingBottom: 0,
    },
    pre: {
      margin: 0,
      padding: 0,
    },
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: minutesState.minutes.colors.secondary,
      color: minutesState.minutes.colors.primary,
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
      width: 100,
      height: 50,
      objectFit: "contain",
    },

    signatureAndDateLine: {
      width: 150,
      borderTop: `1 solid ${minutesState.minutes.colors.primary}`,
    },

    signatureAndDateText: {
      fontSize: 24,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.minutesContent}>
          <Html stylesheet={stylesheet} style={styles.titleText}>
            {parsedMinutes.name}
          </Html>
          {parsedMinutes.segments.map((segment, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index} style={styles.section}>
              <Html stylesheet={stylesheet} style={styles.contentTitleText}>
                {segment.name}
              </Html>
              <Html stylesheet={stylesheet} style={styles.contentText}>
                {segment.content}
              </Html>
            </View>
          ))}
        </View>
        <View style={styles.signatureAndDateContainer}>
          <View style={styles.signatureContainer}>
            {minutesState.minutes.signatures.length > 0 &&
              minutesState.minutes.signatures[0].image && (
                <Image
                  src={minutesState.minutes.signatures[0].image}
                  style={styles.signatureImage}
                />
              )}
            <View style={styles.signatureAndDateLine} />
            {minutesState.minutes.signatures.length > 0 &&
              minutesState.minutes.signatures[0].signer.length > 0 && (
                <Text style={styles.signatureAndDateText}>
                  {minutesState.minutes.signatures[0].signer}
                </Text>
              )}
            <Text style={styles.signatureAndDateText}>Signature</Text>
          </View>
          <View style={styles.dateContainer}>
            {minutesState.minutes.signatures.length > 0 &&
              minutesState.minutes.signatures[0].timestamp && (
                <View style={styles.timestampContainer}>
                  <Text style={styles.signatureAndDateText}>
                    {moment
                      .utc(minutesState.minutes.signatures[0].timestamp)
                      .format("YYYY-MM-DD")}
                  </Text>
                  <Text style={styles.signatureAndDateText}>
                    {moment
                      .utc(minutesState.minutes.signatures[0].timestamp)
                      .format("HH:mm z")}
                  </Text>
                </View>
              )}
            <View style={styles.signatureAndDateLine} />
            <Text style={styles.signatureAndDateText}>Date</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
