import React, { createContext, useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

const MinutesContext = createContext();

const initialState = {
  minutes: {
    name: "",
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
    segments: [
      {
        id: uuid(),
        name: "Agenda",
        content: "",
      },
      {
        id: uuid(),
        name: "Decisions",
        content: "",
      },
      {
        id: uuid(),
        name: "",
        content: "",
      },
    ],
    startTime: null,
    signatures: [
      {
        id: uuid(),
        image: null,
        signer: "",
        timestamp: null,
      },
    ],
  },

  metadata: {
    writeAccess: null,
    writeToken: null,
    readToken: null,
  },
};

export function MinutesContextProvider({ children }) {
  const [state, setState] = useState(() => {
    return (
      JSON.parse(sessionStorage.getItem("MinutesContext")) ??
      JSON.parse(localStorage.getItem("MinutesContext")) ??
      initialState
    );
  });

  const stateFunctions = useCallback(
    () => ({
      updateMinutes: (newMinutesData) => {
        setState((prevState) => {
          const newState = {
            ...prevState,
            minutes: {
              ...prevState.minutes,
              ...newMinutesData,
            },
          };
          sessionStorage.setItem("MinutesContext", JSON.stringify(newState));
          localStorage.setItem("MinutesContext", JSON.stringify(newState));
          return newState;
        });
      },

      updateMetadata: (newMetadata) => {
        setState((prevState) => {
          const newState = {
            ...prevState,
            metadata: {
              ...prevState.metadata,
              ...newMetadata,
            },
          };

          sessionStorage.setItem("MinutesContext", JSON.stringify(newState));
          localStorage.setItem("MinutesContext", JSON.stringify(newState));
          return newState;
        });
      },

      clearState: () => {
        setState(initialState);
        sessionStorage.setItem("MinutesContext", JSON.stringify(initialState));
        localStorage.setItem("MinutesContext", JSON.stringify(initialState));
      },

      clearSignatures: () => {
        setState((prevState) => {
          const newSignatures = prevState.minutes.signatures.map(() => ({
            image: null,
            signer: "",
            timestamp: null,
          }));

          const newState = {
            ...prevState,
            minutes: {
              ...prevState.minutes,
              signatures: newSignatures,
            },
          };
          sessionStorage.setItem("MinutesContext", JSON.stringify(newState));
          localStorage.setItem("MinutesContext", JSON.stringify(newState));
          return newState;
        });
      },
    }),
    [],
  );

  const contextValues = useMemo(
    () => [state, stateFunctions()],
    [state, stateFunctions],
  );

  return (
    <MinutesContext.Provider value={contextValues}>
      {children}
    </MinutesContext.Provider>
  );
}

export default MinutesContext;
