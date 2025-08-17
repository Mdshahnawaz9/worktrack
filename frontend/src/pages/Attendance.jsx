import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(currentUser);

    if (currentUser) {
      const all = JSON.parse(localStorage.getItem("attendance")) || [];
      const userRecords = all.filter(
        (r) => r.username === currentUser.username
      );
      setRecords(userRecords);

      const today = new Date().toLocaleDateString("en-CA");
      const todays = userRecords.find((r) => r.date === today);
      setTodayRecord(todays || null);
    }
  }, []);

  const updateStorage = (record) => {
    const all = JSON.parse(localStorage.getItem("attendance")) || [];
    const filteredAll = all.filter((r) => r.username !== record.username || r.date !== record.date);
    filteredAll.push(record);
    localStorage.setItem("attendance", JSON.stringify(filteredAll));

    // update UI
    const userRecords = filteredAll.filter((r) => r.username === user.username);
    setRecords(userRecords);
    setTodayRecord(record);
  };

  const handleCheckIn = () => {
    const today = new Date().toLocaleDateString("en-CA");
    if (todayRecord?.checkIn) {
      alert("Already checked in today.");
      return;
    }
    const record = {
      username: user.username,
      date: today,
      checkIn: new Date().toLocaleTimeString(),
      checkOut: "",
    };
    updateStorage(record);
  };

  const handleCheckOut = () => {
    if (!todayRecord?.checkIn) return alert("Check in first.");
    if (todayRecord?.checkOut) return alert("Already checked out.");

    const updated = { ...todayRecord, checkOut: new Date().toLocaleTimeString() };
    updateStorage(updated);
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-semibold">Attendance</h1>

        {/* Action Card */}
        <Card>
          <p className="text-lg">
            Hello, <strong>{user?.username}</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Date: {new Date().toLocaleDateString()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button onClick={handleCheckIn} variant="success">
              Check In
            </Button>
            <Button onClick={handleCheckOut} variant="primary">
              Check Out
            </Button>
          </div>

          <div className="mt-4 space-y-1">
            <p>
              <strong>Check In:</strong> {todayRecord?.checkIn || "–"}
            </p>
            <p>
              <strong>Check Out:</strong> {todayRecord?.checkOut || "–"}
            </p>
          </div>
        </Card>

        {/* History */}
        <Card title="Attendance History">
          {records.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No records yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border px-3 py-2">Date</th>
                    <th className="border px-3 py-2">Check In</th>
                    <th className="border px-3 py-2">Check Out</th>
                  </tr>
                </thead>
                <tbody>
                  {[...records].reverse().map((r, i) => (
                    <tr key={i} className="text-center border-t dark:border-gray-700">
                      <td className="px-3 py-2">{r.date}</td>
                      <td className="px-3 py-2">{r.checkIn || "–"}</td>
                      <td className="px-3 py-2">{r.checkOut || "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
