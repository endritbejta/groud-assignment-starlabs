import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      {/* here goes the header, it should be a component */}
      <header>
        <p>Starlabs assignment</p>
        <nav>
          <ul>
            <li>
              <NavLink to="">Rocket</NavLink>
            </li>
            <li>
              <NavLink to="missions">Missions</NavLink>
            </li>
            <li>
              <NavLink to="dragons">Dragons</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
