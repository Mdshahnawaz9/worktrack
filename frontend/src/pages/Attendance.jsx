import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const storedData = JSON.parse(localStorage.getItem("attendance")) || [];
    const userAttendance = storedData.filter(
      (item) => item.username === currentUser.username
    );
    setAttendanceData(userAttendance);
  }, []);

  const handleCheckIn = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const now = new Date().toISOString();

    const newEntry = {
      username: currentUser.username,
      checkIn: now,
      checkOut: "",
      date: now.split("T")[0],
    };

    const existing = JSON.parse(localStorage.getItem("attendance")) || [];
    existing.push(newEntry);
    localStorage.setItem("attendance", JSON.stringify(existing));

    setAttendanceData([...attendanceData, newEntry]);
  };

  const handleCheckOut = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const now = new Date().toISOString();
    const allData = JSON.parse(localStorage.getItem("attendance")) || [];

    const updatedData = allData.map((entry) => {
      if (
        entry.username === currentUser.username &&
        entry.date === now.split("T")[0] &&
        !entry.checkOut
      ) {
        return { ...entry, checkOut: now };
      }
      return entry;
    });

    localStorage.setItem("attendance", JSON.stringify(updatedData));

    const userAttendance = updatedData.filter(
      (item) => item.username === currentUser.username
    );
    setAttendanceData(userAttendance);
  };

  return (
    <Layout>
      <StatCard title="My Attendance" value={attendanceData.length} />
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleCheckIn}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Check Out
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Attendance Records</h2>
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Check-In</th>
              <th className="border px-2 py-1">Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{entry.date}</td>
                <td className="border px-2 py-1">
                  {entry.checkIn?.split("T")[1]?.split(".")[0] || "-"}
                </td>
                <td className="border px-2 py-1">
                  {entry.checkOut
                    ? entry.checkOut.split("T")[1].split(".")[0]
                    : "Pending"}
                </td>
              </tr>
            ))}
            {attendanceData.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-2 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Attendance;
