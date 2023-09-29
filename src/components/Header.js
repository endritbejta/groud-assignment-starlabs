import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <p className={classes.title}>Starlabs assignment</p>
      <nav className={classes.nav}>
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
          <li>
            <NavLink to="my-profile">My profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
