import { NavLink } from "react-router-dom";
const SideActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "bg-slate-200 " : "hover:bg-slate-100 "
      }
    >
      {children}
    </NavLink>
  );
};

export default SideActiveLink;
