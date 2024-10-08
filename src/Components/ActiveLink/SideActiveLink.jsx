/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

/* SideActiveLink passes down the `isActive` state and children */
const SideActiveLink = ({ to, children }) => {
  console.log(to);
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active-sidebar" : "")}
    >
      {children}
    </NavLink>
  );
};

export default SideActiveLink;
