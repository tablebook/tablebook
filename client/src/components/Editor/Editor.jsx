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
      py: 3,
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },

    editorContainer: {
      display: "flex",
      flexDirection: "column",
      width: 700,
      backgroundColor: minutesState.minutes.colors.secondary,
      mr: 5,
    },

    bottomContainer: {
      display: "flex",
      flexGrow: 1,
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
