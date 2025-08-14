import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  // Safe JSON parse function
  const safeParse = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
      return;
    }
    setUserName(loggedInUser.name || "User");

    // Attendance
    const attendanceData = safeParse("attendance");
    setAttendanceCount(attendanceData.filter(a => a.email === loggedInUser.email).length);

    // Tasks
    const taskData = safeParse("tasks");
    setTaskCount(taskData.filter(t => t.assignedTo === loggedInUser.email).length);

    // Leave Requests
    const leaveData = safeParse("leaveRequests");
    setLeaveCount(leaveData.filter(l => l.email === loggedInUser.email).length);

    // Feedback
    const feedbackData = safeParse("feedbacks");
    setFeedbackCount(feedbackData.filter(f => f.email === loggedInUser.email).length);
  }, [navigate]);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {userName} 👋</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Attendance Records" value={attendanceCount} onClick={() => navigate("/attendance")} />
          <StatCard title="My Tasks" value={taskCount} onClick={() => navigate("/tasks")} />
          <StatCard title="Leave Requests" value={leaveCount} onClick={() => navigate("/leave")} />
          <StatCard title="Feedback Given" value={feedbackCount} onClick={() => navigate("/feedback")} />
        </div>
      </div>
    </Layout>
  );
}
