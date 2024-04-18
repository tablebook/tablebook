import { useContext } from "react";
import MinutesContext from "../contexts/MinutesContext";

const useHandleSignatureAffectingChange = () => {
  const [minutesState, { clearSignatures }] = useContext(MinutesContext);

  /**
   *
   * @returns Should signature affecting change go through?
   */
  const handleSignatureAffectingChange = () => {
    const firstSignature = minutesState.minutes.signatures[0];

    const isSignaturesEmpty =
      minutesState.minutes.signatures.length === 1 &&
      !firstSignature.image &&
      !firstSignature.signer &&
      !firstSignature.timestamp;

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
