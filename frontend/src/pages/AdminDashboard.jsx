import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    tasks: 0,
    documents: 0,
    feedbacks: 0,
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const documents = JSON.parse(localStorage.getItem("documents")) || [];
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    setStats({
      users: users.length,
      tasks: tasks.length,
      documents: documents.length,
      feedbacks: feedbacks.length,
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Total Tasks" value={stats.tasks} />
        <StatCard title="Documents Uploaded" value={stats.documents} />
        <StatCard title="Feedback Entries" value={stats.feedbacks} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
