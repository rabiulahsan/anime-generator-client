import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import CoinProvider from "./Providers/CoinContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CoinProvider>
        <RouterProvider router={router}></RouterProvider>
      </CoinProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
