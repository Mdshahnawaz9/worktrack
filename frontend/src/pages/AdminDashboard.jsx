import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    totalProjects: 0,
    pendingLeaves: 0,
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const leaves = JSON.parse(localStorage.getItem("leaves")) || [];

    setStats({
      totalEmployees: users.length,
      totalTasks: tasks.length,
      totalProjects: projects.length,
      pendingLeaves: leaves.filter((l) => l.status === "Pending").length,
    });
  }, []);

  const handleCardClick = (type) => {
    switch (type) {
      case "employees":
        navigate("/admin/employees");
        break;
      case "tasks":
        navigate("/AdminTasks");
        break;
      case "projects":
        navigate("/admin/projects");
        break;
      case "leaves":
        navigate("/AdminLeaveRequests");
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="p-4">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Admin Dashboard
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            onClick={() => handleCardClick("employees")}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            onClick={() => handleCardClick("tasks")}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            onClick={() => handleCardClick("projects")}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <StatCard
            title="Pending Leaves"
            value={stats.pendingLeaves}
            onClick={() => handleCardClick("leaves")}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
