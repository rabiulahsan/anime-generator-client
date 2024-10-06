import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Tools from "../pages/Tools/Tools";
import Gallary from "../pages/Gallary/Gallary";
import PricingPage from "../pages/PricingPage/PricingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/tools",
        element: <Tools></Tools>,
      },
      {
        path: "/gallary",
        element: <Gallary></Gallary>,
      },
      {
        path: "/pricing",
        element: <PricingPage></PricingPage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/signup",
        element: <SignupPage></SignupPage>,
      },
    ],
  },
]);
