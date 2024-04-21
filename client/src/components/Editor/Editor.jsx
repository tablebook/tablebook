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
    editorContainer: {
      height: "fit-content",
      my: 5,
      display: "flex",
      flexDirection: "column",
      backgroundColor: minutesState.minutes.colors.secondary,
      minHeight: "100%",
      mx: "auto",
      maxWidth: { xs: 500, md: 700 },
    },

    middleSpacing: {
      flexGrow: 1,
    },
  };

  return (
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
        <SegmentContainer key={signature.id}>
          <SideContainer>
            {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
              <SignatureButtons signatureIndex={index} />
            )}
          </SideContainer>
          <Signature signatureIndex={index} />
        </SegmentContainer>
      ))}
    </Box>
  );
}

export default Editor;
