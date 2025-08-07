import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const AdminAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendanceRecords(storedAttendance);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">All Users' Attendance</h1>
      {attendanceRecords.length === 0 ? (
        <p className="text-center text-gray-500">No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Check-in</th>
                <th className="border px-4 py-2">Check-out</th>
                <th className="border px-4 py-2">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{record.username}</td>
                  <td className="border px-4 py-2">{record.date}</td>
                  <td className="border px-4 py-2">{record.checkIn}</td>
                  <td className="border px-4 py-2">{record.checkOut}</td>
                  <td className="border px-4 py-2">{record.totalHours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default AdminAttendance;
