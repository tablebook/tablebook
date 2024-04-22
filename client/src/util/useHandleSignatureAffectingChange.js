import { useContext } from "react";
import { useTranslation } from "react-i18next";
import MinutesContext from "../contexts/MinutesContext";

const useHandleSignatureAffectingChange = () => {
  const { t } = useTranslation();
  const [minutesState, { clearSignatures }] = useContext(MinutesContext);

  /**
   *
   * @returns Should signature affecting change go through?
   */
  const handleSignatureAffectingChange = () => {
    let isSignaturesEmpty = true;

    Object.values(minutesState.minutes.signatures).forEach((signature) => {
      const signatureHasValues =
        signature.image || signature.signer || signature.timestamp;

      if (signatureHasValues) {
        isSignaturesEmpty = false;
      }
    });

    if (isSignaturesEmpty) {
      return true;
    }

    if (!window.confirm(t("clearAllSignatures"))) {
      return false;
    }

    clearSignatures();

    return true;
  };

  return handleSignatureAffectingChange;
};

export default useHandleSignatureAffectingChange;
