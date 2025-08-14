// src/pages/Attendance.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function Attendance() {
  const [user, setUser] = useState(null);
  const [todayRecord, setTodayRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const loggedInUser = JSON.parse(storedUser);
        if (loggedInUser?.username) {
          setUser(loggedInUser);

          const allAttendance =
            JSON.parse(localStorage.getItem("attendance")) || [];
          const today = new Date().toLocaleDateString("en-CA");
          const record = allAttendance.find(
            (r) =>
              r.username === loggedInUser.username && r.date === today
          );
          setTodayRecord(record || null);
          setLoading(false);
          return;
        }
      }

      alert("Please log in first!");
      window.location.href = "/login";
    } catch (err) {
      console.error("Error reading localStorage:", err);
      alert("Please log in first!");
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLocalStorage = (record) => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const index = allAttendance.findIndex(
      (r) => r.username === record.username && r.date === record.date
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
      username: user.username,
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

  if (loading) return null;

  return (
    <Layout>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          Attendance
        </h1>

        <Card>
          <p className="text-lg dark:text-gray-200">
            Welcome,{" "}
            <span className="font-semibold">{user?.username}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Date: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button variant="success" onClick={handleCheckIn}>
              Check In
            </Button>
            <Button variant="primary" onClick={handleCheckOut}>
              Check Out
            </Button>
          </div>

          <div className="mt-6 space-y-2">
            <p className="dark:text-gray-200">
              <strong>Check In:</strong> {todayRecord?.checkIn || "—"}
            </p>
            <p className="dark:text-gray-200">
              <strong>Check Out:</strong> {todayRecord?.checkOut || "—"}
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
