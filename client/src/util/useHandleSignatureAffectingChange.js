import { useContext } from "react";
import MinutesContext from "../contexts/MinutesContext";

const useHandleSignatureAffectingChange = () => {
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

    if (
      !window.confirm("This action will clear all signatures! Are you sure?")
    ) {
      return false;
    }

    clearSignatures();

    return true;
  };

  return handleSignatureAffectingChange;
};

export default useHandleSignatureAffectingChange;
