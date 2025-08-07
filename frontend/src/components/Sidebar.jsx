// src/components/Sidebar.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Documents', path: '/documents' },
    { name: 'Leaves', path: '/leaves' },
    { name: 'Profile', path: '/profile' },
  ]

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">WorkTrackPro</h2>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                location.pathname === item.path ? 'bg-blue-200 font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

