import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import classes from "./Layout.module.css";
const Layout = () => {
  return (
    <div className={classes.layout}>
      {/* here goes the header, it should be a component */}
      <Header />
      <section className={classes["main-section"]}>
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
