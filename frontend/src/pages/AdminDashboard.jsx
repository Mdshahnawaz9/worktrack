import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    totalProjects: 0,
    pendingLeaves: 0,
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const leaves = JSON.parse(localStorage.getItem('leaves')) || [];

    setStats({
      totalEmployees: users.length,
      totalTasks: tasks.length,
      totalProjects: projects.length,
      pendingLeaves: leaves.filter((l) => l.status === 'Pending').length,
    });
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Employees" value={stats.totalEmployees} />
          <StatCard title="Total Tasks" value={stats.totalTasks} />
          <StatCard title="Total Projects" value={stats.totalProjects} />
          <StatCard title="Pending Leaves" value={stats.pendingLeaves} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
