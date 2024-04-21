import React from "react";
import { Box } from "@mui/material";

function SegmentContainer({ sx, children }) {
  const styles = {
    segmentContainer: {
      display: "flex",
      flexDirection: "row",
      ...sx,
    },
  };

  return <Box sx={styles.segmentContainer}>{children}</Box>;
}

export default SegmentContainer;
