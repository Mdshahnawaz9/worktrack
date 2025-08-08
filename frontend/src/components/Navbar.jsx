// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ onLogout, darkMode, toggleDarkMode }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-900 dark:text-white shadow">
      <h1 className="text-xl font-bold">WorkTrackPro</h1>

      <div className="flex items-center gap-4">
        {/* Show username if available */}
        {user?.name && (
          <span className="text-sm hidden sm:inline">
            👤 {user.name} ({user.role})
          </span>
        )}

        {/* Toggle dark mode button */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded hover:opacity-80"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Logout button */}
        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            if (onLogout) onLogout();
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
