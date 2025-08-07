import React from "react";
import Layout from "../components/Layout";

const AdminAttendance = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">All Employee Attendance</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p>Filter by date, user, presence, etc. (UI only)</p>
        {/* Replace this with a table UI if needed */}
        <ul className="mt-4 space-y-2">
          <li>👤 John Doe - Present - 9h</li>
          <li>👤 Jane Smith - Absent</li>
          <li>👤 Alex Johnson - Present - 7h</li>
        </ul>
      </div>
    </Layout>
  );
};

export default AdminAttendance;
