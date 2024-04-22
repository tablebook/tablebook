import { useContext } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";

const useReloadMinutes = () => {
  const { t } = useTranslation();
  const [minutesState, { updateMinutes, updateMetadata }] =
    useContext(MinutesContext);

  const reloadMinutes = async () => {
    try {
      const minutesResponse = await minutesService.getMinutesByToken(
        minutesState.metadata.writeToken ?? minutesState.metadata.readToken,
      );

      if (
        !_.isEqual(minutesState.minutes, minutesResponse.data) && // If state differs from incoming minutes
        !window.confirm(t("changesInIncomingMinutes")) // If user cancels
      ) {
        return;
      }

      updateMinutes(minutesResponse.data);

      updateMetadata({
        writeAccess: Boolean(minutesResponse.writeToken),
        readToken: minutesResponse.readToken,
        writeToken: minutesResponse.writeToken,
      });
      toast.success(t("loadedMinutesSuccesful"));
    } catch (error) {
      toast.error(t("loadedMinutesFail"));
    }
  };

  return reloadMinutes;
};

export default useReloadMinutes;
