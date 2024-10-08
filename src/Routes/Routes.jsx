import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Gallary from "../pages/Gallary/Gallary";
import PricingPage from "../pages/PricingPage/PricingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ToolsLayout from "../Layout/ToolsLayout";
import ToolsPage from "../pages/ToolsPage/ToolsPage";
import Generate from "../pages/ToolsPage/Generate";
import Removebg from "../pages/ToolsPage/Removebg";
import Changebg from "../pages/ToolsPage/Changebg";
import Reimagine from "../pages/ToolsPage/Reimagine";
import Upscaling from "../pages/ToolsPage/Upscaling";

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
  {
    path: "/tools", // Route using the SecondaryLayout
    element: <ToolsLayout></ToolsLayout>,
    children: [
      {
        path: "/tools", // Nested under secondary layout
        element: <ToolsPage></ToolsPage>,
      },
      {
        path: "/tools/generate", // Nested under secondary layout
        element: <Generate></Generate>,
      },
      {
        path: "/tools/upscale", // Nested under secondary layout
        element: <Upscaling></Upscaling>,
      },
      {
        path: "/tools/reimagine", // Nested under secondary layout
        element: <Reimagine></Reimagine>,
      },
      {
        path: "/tools/bgchange", // Nested under secondary layout
        element: <Changebg></Changebg>,
      },
      {
        path: "/tools/bgremove", // Nested under secondary layout
        element: <Removebg></Removebg>,
      },
    ],
  },
]);
