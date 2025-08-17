import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = user?.role === "admin";

  const userNav = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Attendance", path: "/attendance" },
    { name: "Tasks", path: "/tasks" },
    { name: "My Documents", path: "/mydocuments" },
    { name: "Leave Requests", path: "/leaverequests" },
    { name: "Feedback", path: "/feedback" },
    { name: "Profile", path: "/profile" },
  ];

  const adminNav = [
    { name: "Admin Dashboard", path: "/admindashboard" },
    { name: "Attendance", path: "/adminattendance" },
    { name: "Tasks", path: "/admintasks" },
    { name: "Documents", path: "/adminmydocuments" },
    { name: "Leave Requests", path: "/adminleaverequests" },
    { name: "Feedback", path: "/adminfeedback" },
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
