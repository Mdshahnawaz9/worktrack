import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    tasks: 0,
    hours: 0,
    documents: 0,
    leaves: 0,
  });

  useEffect(() => {
    // Fetching real-time user-entered data from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const timeEntries = JSON.parse(localStorage.getItem("timeTracking")) || [];
    const documents = JSON.parse(localStorage.getItem("documents")) || [];
    const leaves = JSON.parse(localStorage.getItem("leaves")) || [];

    const totalHours = timeEntries.reduce(
      (sum, entry) => sum + (entry.hours || 0),
      0
    );

    setStats({
      tasks: tasks.length,
      hours: totalHours,
      documents: documents.length,
      leaves: leaves.length,
    });
  }, []);

  const statData = [
    { title: "Total Tasks", value: stats.tasks.toString() },
    { title: "Hours Tracked", value: `${stats.hours}h` },
    { title: "Documents", value: stats.documents.toString() },
    { title: "Leave Requests", value: stats.leaves.toString() },
  ];

  return (
    <Layout>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statData.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
