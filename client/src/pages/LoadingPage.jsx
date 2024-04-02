import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";
import logoImage from "../assets/images/logo.png";
import Image from "../components/Image";

function LoadingPage() {
  const { token } = useParams();
  const [, { updateMinutes, updateMetadata }] = useContext(MinutesContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [numberOfDots, setNumberOfDots] = useState(0);

  const styles = {
    container: {
      backgroundColor: theme.palette.background.main,
      width: "100vw",
      height: "100dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    message: { fontSize: "3rem" },
    textContainer: {
      display: "flex",
    },
    dots: { fontSize: "3rem", width: 20 },
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumberOfDots((previous) => (previous < 3 ? previous + 1 : 0));
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (token) {
      const handleToken = async () => {
        try {
          const minutesResponse = await minutesService.getMinutesByToken(token);

          updateMinutes(minutesResponse.data);

          updateMetadata({
            writeAccess: minutesResponse.writeAccess,
            readToken: minutesResponse.readToken,
            writeToken: minutesResponse.writeToken,
          });
        } catch (error) {
          // This await is needed to show the alert before navigation is executed
          await alert("There was a problem loading minutes");
        } finally {
          navigate("/minutes", { replace: true });
        }
      };
      handleToken();
    }
  }, [navigate, token, updateMetadata, updateMinutes]);

  return (
    <Box sx={styles.container}>
      <Image
        height="200px"
        width="200px"
        src={logoImage}
        alt="tablebook logo"
      />

      <Box sx={styles.textContainer}>
        <Typography sx={styles.message}>Loading</Typography>
        <Typography sx={styles.dots}>{".".repeat(numberOfDots)}</Typography>
      </Box>
    </Box>
  );
}

export default LoadingPage;
