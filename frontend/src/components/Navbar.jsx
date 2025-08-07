// src/components/Navbar.jsx
import React from 'react'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard'
      case '/attendance': return 'Attendance'
      case '/tasks': return 'Tasks'
      case '/documents': return 'My Documents'
      case '/leaves': return 'Leave Requests'
      case '/profile': return 'My Profile'
      default: return 'WorkTrackPro'
    }
  }

  return (
    <div className="bg-white shadow-md py-4 px-6">
      <h1 className="text-xl font-semibold text-gray-800">{getTitle()}</h1>
    </div>
  )
}

export default Navbar
