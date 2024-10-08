import { Outlet } from "react-router-dom";
import LeftSideNavbar from "../Shared/LeftSideNavbar/LeftSideNavbar";
import Navbar from "../pages/Home/Navbar/Navbar";

const ToolsLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex w-full">
        <div className="w-1/4 ">
          <LeftSideNavbar></LeftSideNavbar>
        </div>
        <div className="w-3/5 bg-[#ebeaf8]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ToolsLayout;
