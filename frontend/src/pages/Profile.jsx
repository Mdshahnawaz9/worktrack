import React from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Profile = () => {
  const stats = [
    { title: "Name", value: "Md Shahnawaz" },
    { title: "Role", value: "Employee" },
    { title: "Joined", value: "Jan 2023" },
    { title: "Department", value: "Tech" },
  ];

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-700 dark:text-gray-300">
            You can customize this section with editable profile information.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
