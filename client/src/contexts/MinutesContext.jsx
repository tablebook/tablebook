import React, { createContext, useState } from "react";

const MinutesContext = createContext();

export function MinutesContextProvider({ children }) {
  const [state, setState] = useState({
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
  });

  const updateMinutes = (newMinutesData) => {
    setState((prevState) => ({
      ...prevState,
      minutes: {
        ...prevState.minutes,
        ...newMinutesData,
      },
    }));
  };

  const updateMetadata = (newMetadata) => {
    setState((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        ...newMetadata,
      },
    }));
  };

  return (
    <MinutesContext.Provider value={[state, updateMinutes, updateMetadata]}>
      {children}
    </MinutesContext.Provider>
  );
}

export default MinutesContext;
