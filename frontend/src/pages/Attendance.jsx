// src/pages/Attendance.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Attendance = () => {
  const [status, setStatus] = useState("Not Checked In");
  const [attendance, setAttendance] = useState([]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const userAttendance = allAttendance.filter(
      (entry) => entry.username === currentUser?.username
    );

    const today = new Date().toISOString().split("T")[0];
    const todayEntry = userAttendance.find((entry) => entry.date === today);

    setAttendance(userAttendance);
    setCheckedIn(!!todayEntry?.checkIn);
    setCheckedOut(!!todayEntry?.checkOut);

    if (todayEntry?.checkOut) setStatus("Checked Out");
    else if (todayEntry?.checkIn) setStatus("Checked In");
    else setStatus("Not Checked In");
  }, [currentUser]);

  const handleCheckIn = () => {
    if (checkedIn) return alert("Already checked in for today.");

    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const today = new Date().toISOString().split("T")[0];
    const checkInTime = new Date().toLocaleTimeString();

    const newEntry = {
      username: currentUser.username,
      date: today,
      checkIn: checkInTime,
      checkOut: "",
    };

    allAttendance.push(newEntry);
    localStorage.setItem("attendance", JSON.stringify(allAttendance));

    setCheckedIn(true);
    setStatus("Checked In");
    setAttendance((prev) => [...prev, newEntry]);
  };

  const handleCheckOut = () => {
    if (!checkedIn) return alert("Please check in first.");
    if (checkedOut) return alert("Already checked out for today.");

    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const today = new Date().toISOString().split("T")[0];

    const updatedAttendance = allAttendance.map((entry) => {
      if (entry.username === currentUser.username && entry.date === today) {
        return { ...entry, checkOut: new Date().toLocaleTimeString() };
      }
      return entry;
    });

    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    setCheckedOut(true);
    setStatus("Checked Out");
    setAttendance(updatedAttendance.filter((e) => e.username === currentUser.username));
  };

  return (
    <Layout>
      <div className="p-4 transition-colors duration-300">
        <h1 className="text-2xl font-semibold mb-4">Attendance</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard title="Status" value={status} />
          <StatCard title="Total Days" value={attendance.length} />
          <StatCard title="Check-Ins" value={attendance.filter((a) => a.checkIn).length} />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleCheckIn}
            className={`px-6 py-2 rounded text-white transition-colors duration-300 ${
              checkedIn
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={checkedIn}
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            className={`px-6 py-2 rounded text-white transition-colors duration-300 ${
              !checkedIn || checkedOut
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={!checkedIn || checkedOut}
          >
            Check Out
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-left transition-colors duration-300">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600">
                <th className="p-3 text-gray-900 dark:text-gray-200">Date</th>
                <th className="p-3 text-gray-900 dark:text-gray-200">Check In</th>
                <th className="p-3 text-gray-900 dark:text-gray-200">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No attendance records yet.
                  </td>
                </tr>
              ) : (
                [...attendance].reverse().map((entry, idx) => (
                  <tr key={idx} className="border-t dark:border-gray-700">
                    <td className="p-3 text-gray-900 dark:text-gray-200">{entry.date}</td>
                    <td className="p-3 text-gray-900 dark:text-gray-200">
                      {entry.checkIn || "–"}
                    </td>
                    <td className="p-3 text-gray-900 dark:text-gray-200">
                      {entry.checkOut || "–"}
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

export default Attendance;
