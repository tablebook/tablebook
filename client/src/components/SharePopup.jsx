import {
  Button,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import LinkIcon from "@mui/icons-material/Link";
import { toast } from "react-toastify";

import EditorContext from "../contexts/EditorContext";
import MinutesContext from "../contexts/MinutesContext";
import PopupBase from "./Shared/PopupBase";

function SharePopup() {
  const { t } = useTranslation();
  const [editorState, updateEditor] = useContext(EditorContext);
  const [minutesState] = useContext(MinutesContext);

  const isPopupOpen = Boolean(editorState.sharePopupAnchorElement);
  const closePopup = () => updateEditor({ sharePopupAnchorElement: null });

  const handleCopyUrl = async (event) => {
    const inputElement =
      event.currentTarget.parentElement.parentElement.querySelector("input");
    const inputElementValue = inputElement.value;

    inputElement.focus();
    inputElement.select();

    try {
      await navigator.clipboard.writeText(inputElementValue);
      toast.info(t("linkCopiedToClipboard"));
    } catch (error) {
      toast.error(t("couldntCopyLinkToClipboard"));
    }
  };

  const inputProps = {
    readOnly: true,
    endAdornment: (
      <InputAdornment position="end">
        <Button variant="contained" onClick={handleCopyUrl}>
          <LinkIcon />
        </Button>
      </InputAdornment>
    ),
  };

  const baseUrl = `${window.location.origin}/minutes/`;

  return (
    <Popover
      open={isPopupOpen}
      anchorEl={editorState.sharePopupAnchorElement}
      onClose={closePopup}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <PopupBase title="Share">
        {minutesState.metadata.readToken && (
          <>
            <Typography>{t("readLink")}</Typography>
            <TextField
              data-testid="read-only-link"
              value={baseUrl + (minutesState.metadata.readToken ?? "")}
              InputProps={inputProps}
            />
          </>
        )}
        {minutesState.metadata.writeToken && (
          <>
            <Typography>{t("editLink")}</Typography>
            <TextField
              data-testid="write-link"
              value={baseUrl + (minutesState.metadata.writeToken ?? "")}
              InputProps={inputProps}
            />
          </>
        )}
      </PopupBase>
    </Popover>
  );
}

export default SharePopup;
