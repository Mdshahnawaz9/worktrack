// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/Dashboard" },
    { name: "Attendance", path: "/Attendance" },
    { name: "Tasks", path: "/Tasks" },
    { name: "MyDocuments", path: "/MyDocuments" },
    { name: "LeaveRequests", path: "/LeaveRequest" },
    { name: "Feedback", path: "/Feedback" },
    { name: "Profile", path: "/Profile" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-white fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6">WorkTrackPro</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
