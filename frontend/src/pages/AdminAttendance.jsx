// src/pages/AdminAttendance.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const AdminAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceData(allAttendance);
    setFilteredData(allAttendance);
  }, []);

  // Search by email/username
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, filterDate);
  };

  // Filter by date
  const handleDateFilter = (e) => {
    const dateValue = e.target.value;
    setFilterDate(dateValue);
    applyFilters(searchTerm, dateValue);
  };

  const applyFilters = (searchValue, dateValue) => {
    let filtered = [...attendanceData];
    if (searchValue) {
      filtered = filtered.filter((entry) =>
        entry.email.toLowerCase().includes(searchValue)
      );
    }
    if (dateValue) {
      filtered = filtered.filter((entry) => entry.date === dateValue);
    }
    setFilteredData(filtered);
  };

  // Delete a single record
  const handleDelete = (index) => {
    if (window.confirm("Delete this record?")) {
      const updated = [...attendanceData];
      updated.splice(index, 1);
      setAttendanceData(updated);
      setFilteredData(updated);
      localStorage.setItem("attendance", JSON.stringify(updated));
    }
  };

  // Clear all records
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL attendance records?")) {
      setAttendanceData([]);
      setFilteredData([]);
      localStorage.setItem("attendance", JSON.stringify([]));
    }
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
          <StatCard
            title="Check-Ins Recorded"
            value={attendanceData.filter((a) => a.checkIn).length}
          />
        </div>

        {/* Search + Date Filter + Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by email..."
            className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <input
            type="date"
            value={filterDate}
            onChange={handleDateFilter}
            className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button
            onClick={handleClearAll}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-left dark:bg-gray-800 dark:text-white">
            <thead>
              <tr className="bg-gray-100 border-b dark:bg-gray-700">
                <th className="p-3">Email</th>
                <th className="p-3">Date</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500 dark:text-gray-400">
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
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(attendanceData.indexOf(entry))}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
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
