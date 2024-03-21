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
    startTime: "",
    signatures: [
      {
        signer: "",
        timestamp: "",
        image: "",
      },
    ],
  });

  const updateMinutes = (newMinutesData) => {
    setMinutes((prevMinutes) => ({
      ...prevMinutes,
      ...newMinutesData,
    }));
  };

  return (
    <MinutesContextProvider value={{ minutes, updateMinutes }}>
      {props.children}
    </MinutesContextProvider>
  );
};

export default MinutesContext;
