import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const MyDocuments = () => {
  const stats = [
    { title: "Uploaded Files", value: "12" },
    { title: "PDFs", value: "5" },
    { title: "Images", value: "7" },
    { title: "Total Size", value: "3.4 MB" },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">My Documents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} />
        ))}
      </div>
      <div className="text-gray-500 dark:text-gray-300">
        {/* Replace this with actual document list UI */}
        <p>No documents uploaded yet.</p>
      </div>
    </Layout>
  );
};

export default MyDocuments;
