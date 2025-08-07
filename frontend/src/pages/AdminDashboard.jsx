import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  const stats = [
    { title: "Employees", value: "25" },
    { title: "Total Tasks", value: "120" },
    { title: "Leaves Pending", value: "4" },
    { title: "Documents Uploaded", value: "80" },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
