import { Outlet } from "react-router-dom";
import LeftSideNavbar from "../Shared/LeftSideNavbar/LeftSideNavbar";
import Navbar from "../pages/Home/Navbar/Navbar";

const ToolsLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex w-full bg-slate-100 px-[5%] py-[3%]">
        <div className="w-1/4 ">
          <LeftSideNavbar></LeftSideNavbar>
        </div>
        <div className="w-4/5 bg-white rounded-lg">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ToolsLayout;
