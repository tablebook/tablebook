import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import LoadingPage from "./pages/LoadingPage";

const router = createBrowserRouter([
  {
    path: "minutes",
    children: [
      {
        path: ":token",
        element: <LoadingPage />,
      },
      {
        index: true,
        element: <EditorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/minutes" />,
  },
]);

export default router;
