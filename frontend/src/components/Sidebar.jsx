import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = user?.role === "admin";

  const userNav = [
    { name: "Dashboard", path: "/Dashboard" },
    { name: "Attendance", path: "/Attendance" },
    { name: "Tasks", path: "/Tasks" },
    { name: "My Documents", path: "/MyDocuments" },
    { name: "Leave Requests", path: "/LeaveRequests" },
    { name: "Feedback", path: "/Feedback" },
    { name: "Profile", path: "/Profile" },
  ];

  const adminNav = [
    { name: "Admin Dashboard", path: "/AdminDashboard" },
    { name: "Attendance", path: "/AdminAttendance" },
    { name: "Tasks", path: "/AdminTasks" },
    { name: "Documents", path: "/AdminMyDocuments" },
    { name: "Leave Requests", path: "/AdminLeaveRequests" },
    { name: "Feedback", path: "/AdminFeedback" },
  ];

  const links = isAdmin ? adminNav : userNav;

  const LinkItem = ({ to, label }) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm ${
          isActive || location.pathname === to
            ? "bg-blue-600 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <>
      {/* overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed z-50 sm:static sm:translate-x-0 inset-y-0 left-0 w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {isAdmin ? "Admin" : "User"} Menu
        </h2>
        <nav className="space-y-1">
          {links.map((l) => (
            <LinkItem key={l.path} to={l.path} label={l.name} />
          ))}
        </nav>
      </aside>
    </>
  );
}
