// src/pages/Attendance.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Attendance = () => {
  const [user, setUser] = useState(null);
  const [todayRecord, setTodayRecord] = useState(null);

  useEffect(() => {
    // Get current logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please log in first!");
      window.location.href = "/login";
      return;
    }
    setUser(loggedInUser);

    // Load today's attendance for this user
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
    const record = allAttendance.find(
      (r) => r.email === loggedInUser.email && r.date === today
    );
    setTodayRecord(record || null);
  }, []);

  const updateLocalStorage = (record) => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const index = allAttendance.findIndex(
      (r) => r.email === record.email && r.date === record.date
    );

    if (index >= 0) {
      allAttendance[index] = record;
    } else {
      allAttendance.push(record);
    }

    localStorage.setItem("attendance", JSON.stringify(allAttendance));
    setTodayRecord(record);
  };

  const handleCheckIn = () => {
    if (todayRecord?.checkIn) {
      alert("You have already checked in today.");
      return;
    }

    const record = todayRecord || {
      email: user.email,
      date: new Date().toLocaleDateString("en-CA"),
      checkIn: "",
      checkOut: "",
    };

    record.checkIn = new Date().toLocaleTimeString();
    updateLocalStorage(record);
  };

  const handleCheckOut = () => {
    if (!todayRecord?.checkIn) {
      alert("You need to check in first.");
      return;
    }
    if (todayRecord?.checkOut) {
      alert("You have already checked out today.");
      return;
    }

    const record = { ...todayRecord };
    record.checkOut = new Date().toLocaleTimeString();
    updateLocalStorage(record);
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-6">Attendance</h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors">
          <p className="text-lg dark:text-gray-200">
            Welcome, <span className="font-semibold">{user?.username}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Date: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCheckIn}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            >
              Check In
            </button>
            <button
              onClick={handleCheckOut}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Check Out
            </button>
          </div>

          <div className="mt-6">
            <p className="dark:text-gray-200">
              <strong>Check In:</strong> {todayRecord?.checkIn || "—"}
            </p>
            <p className="dark:text-gray-200">
              <strong>Check Out:</strong> {todayRecord?.checkOut || "—"}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
