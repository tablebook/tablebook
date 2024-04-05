import React, { useContext } from "react";
import { Box } from "@mui/material";
import Title from "./Title";
import SideContainer from "./SideContainer";
import SegmentContainer from "./SegmentContainer";
import SegmentButtons from "./SegmentButtons";
import Segment from "./Segment";
import Signature from "./Signature";
import MinutesContext from "../contexts/MinutesContext";

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
    },

    bottomContentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      width: 1000,
    },
  };

  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.editorContainer}>
        <SegmentContainer>
          <SideContainer />
          <Title />
        </SegmentContainer>

        {minutesState.minutes.segments.map((segment, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SegmentContainer key={index}>
            <SideContainer>
              {!(minutesState.metadata.writeAccess === false) && ( // If writeAccess is anything other than false
                <SegmentButtons segmentIndex={index} />
              )}
            </SideContainer>
            <Segment segmentIndex={index} />
          </SegmentContainer>
        ))}

        <Box sx={styles.bottomContainer}>
          <SideContainer />
          <Box sx={styles.bottomContentContainer}>
            <Signature />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Editor;
