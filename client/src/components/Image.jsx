import React from "react";
import { Box } from "@mui/material";

function Image({ src, sx, alt }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box component="img" src={src} sx={sx} alt={alt} />
  );
}

export default Image;
