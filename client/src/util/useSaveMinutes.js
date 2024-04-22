import { useContext } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";

const useSaveMinutes = () => {
  const { t } = useTranslation();
  const [minutesState] = useContext(MinutesContext);

  const saveMinutes = async () => {
    try {
      await minutesService.updateMinutesByToken(
        minutesState.metadata.writeToken,
        minutesState.minutes,
      );

      toast.success(t("minutesSaved"));
    } catch (error) {
      toast.error(t("minutesSavingFailed"));
    }
  };

  return saveMinutes;
};

export default useSaveMinutes;
