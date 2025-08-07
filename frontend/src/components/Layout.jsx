// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDarkMode } from "./DarkModeProvider";

const Layout = ({ onLogout, children }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar
          onLogout={onLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
