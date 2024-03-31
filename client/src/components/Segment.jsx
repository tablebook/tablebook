import React from "react";
import { Box } from "@mui/material";
import EditorButtons from "./EditorButtons";
import Content from "./Content";
import SideContainer from "./SideContainer";

function Segment({ segmentIndex }) {
  const styles = {
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      width: 1000,
    },
  };

  return (
    <>
      <SideContainer>
        <EditorButtons />
      </SideContainer>

      <Box sx={styles.contentContainer}>
        <Content segmentIndex={segmentIndex} />
      </Box>
    </>
  );
}

export default Segment;
