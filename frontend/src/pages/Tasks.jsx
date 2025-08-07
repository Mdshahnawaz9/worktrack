// src/pages/Tasks.jsx
import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Tasks = () => {
  const stats = [{ title: "Tasks Completed", value: "5/8" }];

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Your Tasks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {stats.map((s, i) => (
            <StatCard key={i} title={s.title} value={s.value} />
          ))}
        </div>
        <ul className="list-disc pl-6 text-gray-800 dark:text-gray-100">
          <li>Design UI for dashboard</li>
          <li>Fix login bug</li>
          <li>Upload documentation</li>
          <li>Submit leave form</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Tasks;
