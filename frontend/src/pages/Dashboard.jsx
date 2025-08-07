// src/pages/Dashboard.jsx
import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const stats = [
    { title: "Total Tasks", value: "8" },
    { title: "Hours Tracked", value: "32h" },
    { title: "Documents", value: "12" },
    { title: "Leave Requests", value: "2" },
  ];

  return (
    <Layout>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
