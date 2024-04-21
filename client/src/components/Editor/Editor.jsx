import React, { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import Title from "./Title";
import SideContainer from "./SideContainer";
import SegmentContainer from "./SegmentContainer";
import SegmentButtons from "./SegmentButtons";
import Segment from "./Segment";
import Signature from "./Signature";
import MinutesContext from "../../contexts/MinutesContext";
import SignatureButtons from "./SignatureButtons";

function Editor() {
  const [minutesState] = useContext(MinutesContext);
  const theme = useTheme();

  const styles = {
    editorContainer: {
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      backgroundColor: minutesState.minutes.colors.secondary,
      minHeight: "100%",
      mx: "auto",
      maxWidth: { xs: 500, sm: 500, md: "75%", lg: 700 },
    },

    middleSpacing: {
      flexGrow: 1,
    },

    outerSpacing: {
      backgroundColor: theme.palette.background.main,
      height: 25,
    },
  };

  return (
    <Box sx={styles.editorContainer} data-testid="editor-component">
      <Box sx={styles.outerSpacing} />
      <SegmentContainer>
        <SideContainer />
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
      <Box sx={styles.outerSpacing} />
    </Box>
  );
}

export default Editor;
