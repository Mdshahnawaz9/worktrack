// src/pages/AdminAttendance.jsx

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { StatCard } from "../components/StatCard";

const AdminAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceData(allAttendance);
    setFilteredData(allAttendance);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = attendanceData.filter((entry) =>
      entry.email.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const totalUsers = [...new Set(attendanceData.map((entry) => entry.email))].length;

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Admin - Attendance</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Entries" value={attendanceData.length} />
          <StatCard title="Unique Users" value={totalUsers} />
          <StatCard title="Check-Ins Recorded" value={attendanceData.filter((a) => a.checkIn).length} />
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by email..."
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left dark:bg-gray-800 dark:text-white">
            <thead>
              <tr className="bg-gray-100 border-b dark:bg-gray-700">
                <th className="p-3">Email</th>
                <th className="p-3">Date</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                [...filteredData]
                  .reverse()
                  .map((entry, idx) => (
                    <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="p-3">{entry.email}</td>
                      <td className="p-3">{entry.date}</td>
                      <td className="p-3">{entry.checkIn || "–"}</td>
                      <td className="p-3">{entry.checkOut || "–"}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAttendance;
