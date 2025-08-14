import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    setUser(userData);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(allTasks.filter((task) => task.assignedTo === userData.email));

    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendance(allAttendance.filter((entry) => entry.email === userData.email));

    const allDocs = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(allDocs.filter((doc) => doc.email === userData.email));

    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaves(allLeaves.filter((leave) => leave.email === userData.email));

    const allFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(allFeedbacks.filter((fb) => fb.email === userData.email));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Welcome, {user.name || "Employee"}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard title="My Tasks" value={tasks.length} />
          <StatCard title="Attendance Records" value={attendance.length} />
          <StatCard title="My Documents" value={documents.length} />
          <StatCard title="Leave Requests" value={leaves.length} />
          <StatCard title="My Feedback" value={feedbacks.length} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
