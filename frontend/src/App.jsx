import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import MyDocuments from './pages/MyDocuments';
import Attendance from './pages/Attendance';
import LeaveRequests from './pages/LeaveRequests';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminTasks from './pages/AdminTasks';
import AdminMyDocuments from './pages/AdminMyDocuments';
import AdminAttendance from './pages/AdminAttendance';
import AdminLeaveRequests from './pages/AdminLeaveRequests';
import AdminFeedback from './pages/AdminFeedback';
import NotFound from './pages/NotFound';

import { DarkModeProvider } from './components/DarkModeProvider';
import ProtectedRoute from './components/ProtectedRoute';

const isAuthenticated = () => {
  return localStorage.getItem("loggedInUser") !== null;
};

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />}
          />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute role="user">
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mydocuments"
            element={
              <ProtectedRoute role="user">
                <MyDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute role="user">
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaverequests"
            element={
              <ProtectedRoute role="user">
                <LeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute role="user">
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admintasks"
            element={
              <ProtectedRoute role="admin">
                <AdminTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminmydocuments"
            element={
              <ProtectedRoute role="admin">
                <AdminMyDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminattendance"
            element={
              <ProtectedRoute role="admin">
                <AdminAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminleaverequests"
            element={
              <ProtectedRoute role="admin">
                <AdminLeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminfeedback"
            element={
              <ProtectedRoute role="admin">
                <AdminFeedback />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
