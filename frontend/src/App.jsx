// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import Tasks from './pages/Tasks'
import MyDocuments from './pages/MyDocuments'
import LeaveRequests from './pages/LeaveRequests'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/documents" element={<MyDocuments />} />
              <Route path="/leaves" element={<LeaveRequests />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
