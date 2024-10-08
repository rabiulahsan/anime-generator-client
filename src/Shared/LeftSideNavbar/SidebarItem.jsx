import SideActiveLink from "../../Components/ActiveLink/SideActiveLink";

/* eslint-disable react/prop-types */
const SidebarItem = ({ icon, text, expanded, url }) => {
  return (
    <>
      <SideActiveLink to={url}>
        <li
          className={`
        relative flex items-center py-3 px-5 my-3
        font-medium rounded-md cursor-pointer
        transition-colors group text-slate-600
        ${expanded ? "justify-start" : "justify-center"}
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

          {!expanded && (
            <div
              className={`
            absolute left-full rounded-md px-5 py-2 ml-6
            bg-white text-slate-600 text-sm font-semibold 
            invisible opacity-20 -translate-x-3 transition-all whitespace-nowrap
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
            >
              {text}
            </div>
          )}
        </li>
      </SideActiveLink>
    </>
  );
};

export default SidebarItem;
