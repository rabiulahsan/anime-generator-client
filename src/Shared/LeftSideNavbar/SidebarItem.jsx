/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SidebarItem = ({ icon, text, expanded, url }) => {
  const location = useLocation();
  const { pathname } = location;
  // console.log(pathname, url);
  const [active, setActive] = useState(false);

  useEffect(() => {
    pathname == `/tools/${url}` ? setActive(true) : setActive(false);
  }, [pathname, url]);

  // console.log(url);
  return (
    <>
      <Link to={url}>
        <li
          className={`relative flex items-center py-3 px-5 my-3  
        font-medium rounded-md cursor-pointer transition-colors group 
        ${expanded ? "justify-start" : "justify-center"}
        ${
          active
            ? "text-slate-100 bg-slate-800"
            : "hover:bg-slate-200 text-slate-600"
        }
        `}
        >
          <span className="text-xl">{icon}</span>
          <span
            className={`overflow-hidden transition-all font-semibold ${
              expanded ? "w-52 ml-3" : "w-0 text-[7px]"
            }`}
          >
            {text}
          </span>

          {/* Tooltip for collapsed menu */}
          {!expanded && (
            <div
              className="absolute left-full rounded-md px-5 py-2 ml-6
          bg-white text-slate-600 text-sm font-semibold invisible opacity-20 
          -translate-x-3 transition-all whitespace-nowrap 
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
            >
              {text}
            </div>
          )}
        </li>
      </Link>
    </>
  );
};

export default SidebarItem;
