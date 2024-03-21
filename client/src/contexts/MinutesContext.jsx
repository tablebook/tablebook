import { createContext, useState } from "react";

const MinutesContext = createContext();

export const MinutesContextProvider = (props) => {
  const [minutes, setMinutes] = useState({
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
  });

  const updateMinutes = (newMinutesData) => {
    setMinutes((prevMinutes) => ({
      ...prevMinutes,
      ...newMinutesData,
    }));
  };

  return (
    <MinutesContext.Provider value={{ minutes, updateMinutes }}>
      {props.children}
    </MinutesContext.Provider>
  );
};

export default MinutesContext;
