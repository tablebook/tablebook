import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./router";
import healthCheck from "./services/healthService";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      healthCheck().catch(() => toast.error(t("serverConnectionFailed")));
    }, 1000 * 300); // 5 minutes

    return () => clearInterval(intervalId);
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
