import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const LeaveRequests = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    reason: "",
  });

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user) {
      const storedLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      const userLeaves = storedLeaves.filter((leave) => leave.username === user.username);
      setLeaveList(userLeaves);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      ...formData,
      username: user.username,
      status: "Pending",
    };
    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const updatedLeaves = [...allLeaves, newLeave];
    localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));
    setLeaveList((prev) => [...prev, newLeave]);
    setFormData({ from: "", to: "", reason: "" });
  };

  return (
    <Layout>
      <StatCard title="Leave Requests" value={leaveList.length} />
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow my-4">
        <h2 className="text-xl font-semibold mb-2">Apply for Leave</h2>
        <form onSubmit={handleSubmit} className="grid gap-2 md:grid-cols-3">
          <input
            type="date"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-full md:col-span-1"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">My Leave History</h2>
        {leaveList.length === 0 ? (
          <p>No leave records found.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
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
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{leave.from}</td>
                  <td className="border px-4 py-2">{leave.to}</td>
                  <td className="border px-4 py-2">{leave.reason}</td>
                  <td className="border px-4 py-2">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default LeaveRequests;
