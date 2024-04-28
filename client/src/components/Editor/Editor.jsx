import React, { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";

import Title from "./Title";
import SideContainer from "./SideContainer";
import SegmentContainer from "./SegmentContainer";
import SegmentButtons from "./SegmentButtons";
import Segment from "./Segment";
import Signature from "./Signature";
import MinutesContext from "../../contexts/MinutesContext";
import SignatureButtons from "./SignatureButtons";
import AddButton from "./AddButton";
import useHandleSignatureAffectingChange from "../../util/useHandleSignatureAffectingChange";
import ColorsButton from "./ColorsButton";

function Editor() {
  const theme = useTheme();
  const [minutesState, { updateMinutes }] = useContext(MinutesContext);
  const handleSignatureAffectingChange = useHandleSignatureAffectingChange();
  const { t } = useTranslation();

  const styles = {
    editorContainer: {
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      backgroundColor: minutesState.minutes.colors.secondary,
      minHeight: "100%",
      mr: { xs: "60px", sm: "120px" },
      width: { xs: 400, sm: "75%", lg: 800 },
    },

    middleSpacing: {
      flexGrow: 1,
    },

    outerSpacing: {
      backgroundColor: theme.palette.background.main,
      height: 25,
    },

    colorIcon: {
      fontSize: theme.fontSizes.l,
    },

    colorButton: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },

    colorButtonContainer: {
      display: "flex",
      alignItems: "center",
      height: "100%",
    },
  };

  const handleAddField = () => {
    if (!handleSignatureAffectingChange()) {
      return;
    }

    const newSegments = [
      ...minutesState.minutes.segments,
      {
        id: uuid(),
        name: "",
        content: "",
      },
    ];
    updateMinutes({ segments: newSegments });
  };

  const handleAddSignatureField = () => {
    const newSignatures = [
      ...minutesState.minutes.signatures,
      {
        id: uuid(),
        image: null,
        signer: "",
        timestamp: null,
      },
    ];

    updateMinutes({ signatures: newSignatures });
  };

  return (
    <Box sx={styles.editorContainer} data-testid="editor-component">
      <Box sx={styles.outerSpacing} />
      <SegmentContainer>
        <SideContainer>
          {!(minutesState.metadata.writeAccess === false) && <ColorsButton />}
        </SideContainer>
        <Title />
      </SegmentContainer>

      {minutesState.minutes.segments.map((segment, index) => (
        <SegmentContainer key={segment.id}>
          <SideContainer>
            {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
              <SegmentButtons segmentIndex={index} />
            )}
          </SideContainer>
          <Segment segmentIndex={index} />
        </SegmentContainer>
      ))}

      {!(minutesState.metadata.writeAccess === false) && (
        <SegmentContainer>
          <SideContainer />
          <AddButton
            color={minutesState.minutes.colors.primary}
            onClick={handleAddField}
          >
            {t("addField")}
          </AddButton>
        </SegmentContainer>
      )}

      <SegmentContainer sx={styles.middleSpacing}>
        <SideContainer />
      </SegmentContainer>

      {minutesState.minutes.signatures.map((signature, index) => (
        <SegmentContainer key={signature.id}>
          <SideContainer>
            {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
              <SignatureButtons signatureIndex={index} />
            )}
          </SideContainer>
          <Signature signatureIndex={index} />
        </SegmentContainer>
      ))}

      {!(minutesState.metadata.writeAccess === false) && (
        <SegmentContainer>
          <SideContainer />
          <AddButton
            color={minutesState.minutes.colors.primary}
            onClick={handleAddSignatureField}
          >
            {t("addSignatureField")}
          </AddButton>
        </SegmentContainer>
      )}
      <Box sx={styles.outerSpacing} />
    </Box>
  );
}

export default Editor;
