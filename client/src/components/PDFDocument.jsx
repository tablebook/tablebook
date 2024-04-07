import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";

function PDFDocument({ minutesState }) {
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
    },

    section: {
      marginBottom: 40,
    },

    contentTitleText: {
      fontSize: 24,
      paddingBottom: 4,
      paddingLeft: 10,
    },

    contentText: {
      fontSize: 16,
      paddingLeft: 20,
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
          <Text style={styles.titleText}>{minutesState.minutes.name}</Text>
          {minutesState.minutes.segments.map((segment, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index} style={styles.section}>
              <Text style={styles.contentTitleText}>{segment.name}</Text>
              <Text style={styles.contentText}>{segment.content}</Text>
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
