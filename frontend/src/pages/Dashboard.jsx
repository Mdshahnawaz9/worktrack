import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);

      // Example: Generate stats from user data
      const generatedStats = [
        { title: "Total Tasks", value: storedUser.tasks?.length || "0" },
        { title: "Hours Tracked", value: storedUser.hoursTracked || "0h" },
        { title: "Documents", value: storedUser.documents?.length || "0" },
        { title: "Leave Requests", value: storedUser.leaves?.length || "0" },
      ];
      setStats(generatedStats);
    }
  }, []);

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
