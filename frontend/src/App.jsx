import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import MyDocuments from "./pages/MyDocuments";
import Attendance from "./pages/Attendance";
import LeaveRequests from "./pages/LeaveRequests";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTasks from "./pages/AdminTasks";
import AdminMyDocuments from "./pages/AdminMyDocuments";
import AdminAttendance from "./pages/AdminAttendance";
import AdminLeaveRequests from "./pages/AdminLeaveRequests";
import AdminFeedback from "./pages/AdminFeedback";
import NotFound from "./pages/NotFound";

import { DarkModeProvider } from "./components/DarkModeProvider";
import ProtectedRoute from "./components/ProtectedRoute";

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
              <ProtectedRoute admin={false}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute admin={false}>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mydocuments"
            element={
              <ProtectedRoute admin={false}>
                <MyDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute admin={false}>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaverequests"
            element={
              <ProtectedRoute admin={false}>
                <LeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute admin={false}>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute admin={false}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute admin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admintasks"
            element={
              <ProtectedRoute admin={true}>
                <AdminTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminmydocuments"
            element={
              <ProtectedRoute admin={true}>
                <AdminMyDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminattendance"
            element={
              <ProtectedRoute admin={true}>
                <AdminAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminleaverequests"
            element={
              <ProtectedRoute admin={true}>
                <AdminLeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminfeedback"
            element={
              <ProtectedRoute admin={true}>
                <AdminFeedback />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
