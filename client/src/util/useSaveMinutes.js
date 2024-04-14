import { useContext } from "react";
import { toast } from "react-toastify";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";

const useSaveMinutes = () => {
  const [minutesState] = useContext(MinutesContext);

  const saveMinutes = async () => {
    try {
      await minutesService.updateMinutesByToken(
        minutesState.metadata.writeToken,
        minutesState.minutes,
      );

      toast.success("Minutes saved successfully!");
    } catch (error) {
      toast.error("Saving minutes failed");
    }
  };

  return saveMinutes;
};

export default useSaveMinutes;
