import { useContext } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import minutesService from "../services/minutesService";
import MinutesContext from "../contexts/MinutesContext";

const useReloadMinutes = () => {
  const [minutesState, { updateMinutes, updateMetadata }] =
    useContext(MinutesContext);

  const reloadMinutes = async () => {
    try {
      const minutesResponse = await minutesService.getMinutesByToken(
        minutesState.metadata.writeToken ?? minutesState.metadata.readToken,
      );

      if (
        !_.isEqual(minutesState.minutes, minutesResponse.data) && // If state differs from incoming minutes
        !window.confirm(
          "There are changes in the incoming minutes. Are you sure you want to overwrite the current minutes?",
        ) // If user cancels
      ) {
        return;
      }

      updateMinutes(minutesResponse.data);

      updateMetadata({
        writeAccess: minutesResponse.writeAccess,
        readToken: minutesResponse.readToken,
        writeToken: minutesResponse.writeToken,
      });
      toast.success("Successfully loaded minutes");
    } catch (error) {
      toast.error("Reloading minutes failed");
    }
  };

  return reloadMinutes;
};

export default useReloadMinutes;
