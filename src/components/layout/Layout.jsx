import { Outlet } from "react-router-dom";
import React from "react";
import HeaderNavigation from "./HeaderNavigation";
const Layout = () => {
  return (
    <>
      <header className="max-width">
        <HeaderNavigation />
      </header>

      <main className="max-width">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
