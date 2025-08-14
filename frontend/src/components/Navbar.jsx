import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeProvider";

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { dark, toggle } = useDarkMode();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <span className="font-bold text-lg text-gray-900 dark:text-white">WorkTrackPro</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {user && (
          <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300 mr-2">
            {user.name} {user.role === "admin" ? "(Admin)" : ""}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
