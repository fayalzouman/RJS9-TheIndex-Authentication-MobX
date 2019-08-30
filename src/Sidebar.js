import React from "react";
import { NavLink } from "react-router-dom";

// Logo
import logo from "./assets/theindex.svg";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <img src={logo} className="logo" alt="the index logo" />
      <section>
        <h4 className="menu-item active">
          <NavLink to="/authors">AUTHORS</NavLink>
        </h4>
        <h4 className="menu-item">
          <NavLink to="/books">BOOKS</NavLink>
        </h4>
        <h4 className="menu-item">
          <NavLink to="/login">LOGIN</NavLink>
        </h4>
        <h4 className="menu-item">
          <NavLink to="/signup">SIGN UP</NavLink>
        </h4>
      </section>
    </div>
  );
};

export default Sidebar;
