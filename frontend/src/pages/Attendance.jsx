import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { StatCard } from "../components/StatCard";

const Attendance = () => {
  const [status, setStatus] = useState("Not Checked In");
  const [attendance, setAttendance] = useState([]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const userAttendance = allAttendance.filter(
      (entry) => entry.email === currentUser?.email
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
      email: currentUser.email,
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
      if (entry.email === currentUser.email && entry.date === today) {
        return { ...entry, checkOut: new Date().toLocaleTimeString() };
      }
      return entry;
    });

    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    setCheckedOut(true);
    setStatus("Checked Out");
    setAttendance(updatedAttendance.filter((e) => e.email === currentUser.email));
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Attendance</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard title="Status" value={status} />
          <StatCard title="Total Days" value={attendance.length} />
          <StatCard title="Check-Ins" value={attendance.filter((a) => a.checkIn).length} />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleCheckIn}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={checkedIn}
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            disabled={!checkedIn || checkedOut}
          >
            Check Out
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Date</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No attendance records yet.
                  </td>
                </tr>
              ) : (
                [...attendance].reverse().map((entry, idx) => (
                  <tr key={idx} className="border-t">
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

export default Attendance;
