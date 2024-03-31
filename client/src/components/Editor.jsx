import React, { useContext } from "react";
import { Box } from "@mui/material";
import Title from "./Title";
import SideContainer from "./SideContainer";
import SegmentContainer from "./SegmentContainer";
import Segment from "./Segment";
import Signature from "./Signature";
import MinutesContext from "../contexts/MinutesContext";

function Editor() {
  const [state] = useContext(MinutesContext);

  const styles = {
    editorContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "80dvh",
      width: "40vw",
      minWidth: 400,
      maxWidth: 1200,
      backgroundColor: state.minutes.colors.secondary,
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
    <Box sx={styles.editorContainer}>
      <SegmentContainer>
        <SideContainer />
        <Title />
      </SegmentContainer>

      {state.minutes.segments.map((segment, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SegmentContainer key={index}>
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
  );
}

export default Editor;
