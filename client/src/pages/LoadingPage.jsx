import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";
import logoImage from "../assets/images/logo.png";
import Image from "../components/Shared/Image";
import deepEqualWithOmit from "../util/deepEqualWithOmit";

function LoadingPage() {
  const { token } = useParams();
  const [minutesState, { updateMinutes, updateMetadata, hasStateChanged }] =
    useContext(MinutesContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [numberOfDots, setNumberOfDots] = useState(0);
  const { t } = useTranslation();

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

          const newMetaData = {
            writeAccess: Boolean(minutesResponse.writeToken),
            readToken: minutesResponse.readToken,
            writeToken: minutesResponse.writeToken,
          };

          const newState = {
            minutes: minutesResponse.data,
            metadata: newMetaData,
          };

          const isIncomingStateDifferent = !deepEqualWithOmit(
            newState,
            minutesState,
            ["readToken", "writeToken"],
          );

          if (
            hasStateChanged() &&
            isIncomingStateDifferent &&
            !window.confirm(
              "This action will overwrite cached minutes. Are you sure?",
            )
          ) {
            return;
          }

          updateMinutes(minutesResponse.data);

          updateMetadata(newMetaData);
        } catch (error) {
          toast.error("There was a problem loading minutes");
        } finally {
          navigate("/minutes", { replace: true });
        }
      };
      handleToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={styles.container}>
      <Image
        height="200px"
        width="200px"
        src={logoImage}
        alt="tablebook logo"
      />

      <Box sx={styles.textContainer}>
        <Typography sx={styles.message}>{t("loading")}</Typography>
        <Typography sx={styles.dots}>{".".repeat(numberOfDots)}</Typography>
      </Box>
    </Box>
  );
}

export default LoadingPage;
