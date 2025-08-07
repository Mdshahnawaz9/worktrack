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
import AuthWrapper from './components/AuthWrapper';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes for Users */}
          <Route
            path="/dashboard"
            element={<AuthWrapper><Dashboard /></AuthWrapper>}
          />
          <Route
            path="/tasks"
            element={<AuthWrapper><Tasks /></AuthWrapper>}
          />
          <Route
            path="/documents"
            element={<AuthWrapper><MyDocuments /></AuthWrapper>}
          />
          <Route
            path="/attendance"
            element={<AuthWrapper><Attendance /></AuthWrapper>}
          />
          <Route
            path="/leave-requests"
            element={<AuthWrapper><LeaveRequests /></AuthWrapper>}
          />
          <Route
            path="/feedback"
            element={<AuthWrapper><Feedback /></AuthWrapper>}
          />
          <Route
            path="/profile"
            element={<AuthWrapper><Profile /></AuthWrapper>}
          />

          {/* Protected Routes for Admin */}
          <Route
            path="/admin/dashboard"
            element={<AuthWrapper><AdminDashboard /></AuthWrapper>}
          />
          <Route
            path="/admin/tasks"
            element={<AuthWrapper><AdminTasks /></AuthWrapper>}
          />
          <Route
            path="/admin/documents"
            element={<AuthWrapper><AdminMyDocuments /></AuthWrapper>}
          />
          <Route
            path="/admin/attendance"
            element={<AuthWrapper><AdminAttendance /></AuthWrapper>}
          />
          <Route
            path="/admin/leave-requests"
            element={<AuthWrapper><AdminLeaveRequests /></AuthWrapper>}
          />
          <Route
            path="/admin/feedback"
            element={<AuthWrapper><AdminFeedback /></AuthWrapper>}
          />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
