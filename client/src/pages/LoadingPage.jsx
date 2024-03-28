import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";

function LoadingPage() {
  const { token } = useParams();
  const [, updateMinutes, updateMetadata] = useContext(MinutesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const handleToken = async () => {
        const minutesResponse = await minutesService.getMinutesByToken(token);

        updateMinutes(minutesResponse.data);

        updateMetadata({ writeAccess: minutesResponse.writeAccess });
        navigate("/minutes", { replace: true });
      };
      handleToken();
    }
  }, [navigate, token, updateMetadata, updateMinutes]);

  return (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  );
}

export default LoadingPage;
