// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ onLogout, darkMode, toggleDarkMode }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-900 dark:text-white shadow">
      <h1 className="text-xl font-bold">WorkTrackPro</h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
