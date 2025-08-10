import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>

          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Protected User Routes */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute role="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Tasks"
            element={
              <ProtectedRoute role="user">
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyDocuments"
            element={
              <ProtectedRoute role="user">
                <MyDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Attendance"
            element={
              <ProtectedRoute role="user">
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/LeaveRequests"
            element={
              <ProtectedRoute role="user">
                <LeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Feedback"
            element={
              <ProtectedRoute role="user">
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute role="user">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ✅ Protected Admin Routes */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminTasks"
            element={
              <ProtectedRoute role="admin">
                <AdminTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminMyDocuments"
            element={
              <ProtectedRoute role="admin">
                <AdminMyDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminAttendance"
            element={
              <ProtectedRoute role="admin">
                <AdminAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminLeaveRequests"
            element={
              <ProtectedRoute role="admin">
                <AdminLeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminFeedback"
            element={
              <ProtectedRoute role="admin">
                <AdminFeedback />
              </ProtectedRoute>
            }
          />

          {/* ✅ 404 Fallback */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
