/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RiAiGenerate } from "react-icons/ri";
import { FaUpRightAndDownLeftFromCenter, FaImages } from "react-icons/fa6";
import { SiRemovedotbg } from "react-icons/si";
import { TbBackground } from "react-icons/tb";
import SidebarItem from "./SidebarItem";

const LeftSideNavbar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex  ">
      {/* LeftSideNavbar Component */}
      <aside
        className={` flex flex-col bg-white  transition-all  rounded-lg ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        {/* Top section with logo and collapse button */}
        <div
          className={`p-5 pb-2 flex items-center 
            ${expanded ? "justify-between" : "justify-center"}
            `}
        >
          <p
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 px-4" : "w-0"
            } text-sky-500 font-bold text-2xl  `}
          >
            Ani
            <span className="text-slate-600">Gen</span>
          </p>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 text-lg text-slate-700 rounded bg-slate-100 hover:bg-slate-200"
          >
            {expanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        {/* Sidebar Items */}
        <ul className="flex-1 px-4">
          <SidebarItem
            icon={<RiAiGenerate />}
            text="Anime Generate"
            url="generate"
            expanded={expanded}
            active
          />
          <SidebarItem
            icon={<FaUpRightAndDownLeftFromCenter />}
            text="Upscaling"
            url="upscale"
            expanded={expanded}
          />
          <SidebarItem
            icon={<SiRemovedotbg />}
            text="Background Change"
            url="bgchange"
            expanded={expanded}
          />
          <SidebarItem
            icon={<TbBackground />}
            text="Remove Background"
            url="bgremove"
            expanded={expanded}
          />
          <SidebarItem
            icon={<FaImages />}
            text="Reimagine"
            url="reimagine"
            expanded={expanded}
          />
        </ul>

        {/* Bottom section with user profile */}
      </aside>
    </div>
  );
};
export default LeftSideNavbar;
