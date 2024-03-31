import React from "react";
import { Box } from "@mui/material";

function SegmentContainer({ children }) {
  const styles = {
    segmentContainer: {
      display: "flex",
      flexDirection: "row",
    },
  };

  return <Box sx={styles.segmentContainer}>{children}</Box>;
}

export default SegmentContainer;
