import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Dashboard = ({ onLogout }) => {
  const stats = [
    { title: "Total Tasks", value: "8" },
    { title: "Hours Tracked", value: "32h" },
    { title: "Documents", value: "12" },
    { title: "Leave Requests", value: "2" },
  ];

  return (
    <Layout onLogout={onLogout}>
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
