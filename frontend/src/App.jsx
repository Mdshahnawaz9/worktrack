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

          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Protected User Routes */}
          <Route path="/Dashboard" element={<AuthWrapper><Dashboard /></AuthWrapper>} />
          <Route path="/Tasks" element={<AuthWrapper><Tasks /></AuthWrapper>} />
          <Route path="/MyDocuments" element={<AuthWrapper><MyDocuments /></AuthWrapper>} />
          <Route path="/Attendance" element={<AuthWrapper><Attendance /></AuthWrapper>} />
          <Route path="/LeaveRequests" element={<AuthWrapper><LeaveRequests /></AuthWrapper>} />
          <Route path="/Feedback" element={<AuthWrapper><Feedback /></AuthWrapper>} />
          <Route path="/Profile" element={<AuthWrapper><Profile /></AuthWrapper>} />

          {/* ✅ Protected Admin Routes */}
          <Route path="/AdminDashboard" element={<AuthWrapper><AdminDashboard /></AuthWrapper>} />
          <Route path="/AdminTasks" element={<AuthWrapper><AdminTasks /></AuthWrapper>} />
          <Route path="/AdminMyDocuments" element={<AuthWrapper><AdminMyDocuments /></AuthWrapper>} />
          <Route path="/AdminAttendance" element={<AuthWrapper><AdminAttendance /></AuthWrapper>} />
          <Route path="/AdminLeaveRequests" element={<AuthWrapper><AdminLeaveRequests /></AuthWrapper>} />
          <Route path="/AdminFeedback" element={<AuthWrapper><AdminFeedback /></AuthWrapper>} />

          {/* ✅ 404 Fallback */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
