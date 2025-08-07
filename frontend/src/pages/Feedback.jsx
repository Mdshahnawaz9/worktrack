import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Feedback = () => {
  const stats = [
    { title: "Feedback Given", value: "4" },
    { title: "Replies", value: "2" },
    { title: "Pending", value: "2" },
    { title: "Total Ratings", value: "4.5★" },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} />
        ))}
      </div>
      <div className="text-gray-500 dark:text-gray-300">
        {/* Replace with feedback form or message list */}
        <p>Your feedback and responses will be shown here.</p>
      </div>
    </Layout>
  );
};

export default Feedback;
