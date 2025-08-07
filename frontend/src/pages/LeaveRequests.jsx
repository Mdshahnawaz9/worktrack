import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const LeaveRequests = () => {
  const stats = [
    { title: "Total Requests", value: "5" },
    { title: "Approved", value: "3" },
    { title: "Pending", value: "1" },
    { title: "Rejected", value: "1" },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Leave Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} />
        ))}
      </div>
      <div className="text-gray-500 dark:text-gray-300">
        {/* Replace with actual leave form or table */}
        <p>Leave request form and status will appear here.</p>
      </div>
    </Layout>
  );
};

export default LeaveRequests;
