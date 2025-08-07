import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Attendance = () => {
  const stats = [
    { title: "Days Present", value: "22" },
    { title: "Days Absent", value: "2" },
    { title: "Total Hours", value: "160h" },
    { title: "Average/Day", value: "7.3h" },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} />
        ))}
      </div>
      <div className="text-gray-500 dark:text-gray-300">
        {/* Replace with calendar or attendance table */}
        <p>Attendance data will appear here.</p>
      </div>
    </Layout>
  );
};

export default Attendance;
