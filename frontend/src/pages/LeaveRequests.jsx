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
      <div className="p-4 space-y-6">
        <StatCard title="Leave Requests" value={leaveList.length} />

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
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
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">My Leave History</h2>
          {leaveList.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No leave records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                    <th className="border px-4 py-2">From</th>
                    <th className="border px-4 py-2">To</th>
                    <th className="border px-4 py-2">Reason</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveList.map((leave, index) => (
                    <tr key={index} className="text-center border-t dark:border-gray-700">
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
        </div>
      </div>
    </Layout>
  );
};

export default LeaveRequests;
