import React, { useContext } from "react";
import { Box } from "@mui/material";
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

  const styles = {
    outerContainer: {
      flexGrow: 1,
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "center",
      my: 3,
    },

    editorContainer: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      maxWidth: 700,
      backgroundColor: minutesState.minutes.colors.secondary,
      minHeight: "100%",
    },

    middleSpacing: {
      flexGrow: 1,
    },

    bottomContainer: {
      display: "flex",
      flexDirection: "row",
      minHeight: 100,
    },
  };

  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.editorContainer} data-testid="editor-component">
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
          <Box sx={styles.bottomContainer} key={signature.id}>
            <SideContainer>
              {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
                <SignatureButtons signatureIndex={index} />
              )}
            </SideContainer>
            <Signature signatureIndex={index} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Editor;
