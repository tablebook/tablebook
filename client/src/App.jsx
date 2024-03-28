import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
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

  return <RouterProvider router={router} />;
}

export default App;
