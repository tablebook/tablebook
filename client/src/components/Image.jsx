import React from "react";
import { Box } from "@mui/material";

function Image({ src, sx, alt }) {
  return <Box component="img" src={src} sx={sx} alt={alt} />;
}

export default Image;
