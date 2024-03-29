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
  const [state, setState] = useState(initialState);

  const stateFunctions = useCallback(
    () => ({
      updateMinutes: (newMinutesData) => {
        setState((prevState) => ({
          ...prevState,
          minutes: {
            ...prevState.minutes,
            ...newMinutesData,
          },
        }));
      },

      updateMetadata: (newMetadata) => {
        setState((prevState) => ({
          ...prevState,
          metadata: {
            ...prevState.metadata,
            ...newMetadata,
          },
        }));
      },

      clearState: () => {
        setState(initialState);
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
