import React, { createContext, useCallback, useMemo, useState } from "react";

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
        name: "Agenda",
        content: "",
      },
      {
        name: "Decisions",
        content: "",
      },
      {
        name: "",
        content: "",
      },
    ],
    startTime: null,
    signatures: [],
  },

  metadata: {
    writeAccess: null,
    writeToken: null,
    readToken: null,
  },
};

export function MinutesContextProvider({ children }) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("MinutesContext")) || initialState,
  );

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

          localStorage.setItem("MinutesContext", JSON.stringify(newState));
          return newState;
        });
      },

      clearState: () => {
        setState(initialState);
        localStorage.setItem("MinutesContext", JSON.stringify(initialState));
      },

      clearSignatures: () => {
        setState((prevState) => {
          const newState = {
            ...prevState,
            minutes: {
              ...prevState.minutes,
              signatures: [],
            },
          };
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
