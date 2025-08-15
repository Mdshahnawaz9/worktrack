import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function LeaveRequests() {
  const [leaveList, setLeaveList] = useState([]);
  const [formData, setFormData] = useState({ from: "", to: "", reason: "" });

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!user) return;
    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const userLeaves = allLeaves.filter((l) => l.username === user.username);
    setLeaveList(userLeaves);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      ...formData,
      username: user.username,
      status: "Pending",
    };

    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const updated = [...allLeaves, newLeave];
    localStorage.setItem("leaveRequests", JSON.stringify(updated));

    // update user UI
    setLeaveList((prev) => [...prev, newLeave]);
    setFormData({ from: "", to: "", reason: "" });
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* Top Stat */}
        <Card>
          <h2 className="text-lg font-semibold mb-2">Total Leave Requests</h2>
          <p className="text-2xl font-bold">{leaveList.length}</p>
        </Card>

        {/* Apply Leave  */}
        <Card title="Apply for Leave">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-4 w-full"
          >
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <Button type="submit" className="w-full" variant="primary">
              Submit
            </Button>
          </form>
        </Card>

        {/* Leave History */}
        <Card title="My Leave History">
          {leaveList.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">
              No leave records found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border px-4 py-2">From</th>
                    <th className="border px-4 py-2">To</th>
                    <th className="border px-4 py-2">Reason</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveList.map((leave, index) => (
                    <tr
                      key={index}
                      className="text-center border-t dark:border-gray-700"
                    >
                      <td className="px-4 py-2">{leave.from}</td>
                      <td className="px-4 py-2">{leave.to}</td>
                      <td className="px-4 py-2">{leave.reason}</td>
                      <td className="px-4 py-2 font-semibold">{leave.status}</td>
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
