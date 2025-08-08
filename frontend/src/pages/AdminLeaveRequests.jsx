import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const AdminLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(stored);
  }, []);

  const handleStatusChange = (index, status) => {
    const updated = [...leaveRequests];
    updated[index].status = status;
    setLeaveRequests(updated);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <StatCard title="Total Requests" value={leaveRequests.length} />

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">All Leave Requests</h2>
          {leaveRequests.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">From</th>
                    <th className="border px-4 py-2">To</th>
                    <th className="border px-4 py-2">Reason</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((leave, index) => (
                    <tr key={index} className="text-center border-t dark:border-gray-700">
                      <td className="px-4 py-2">{leave.username}</td>
                      <td className="px-4 py-2">{leave.from}</td>
                      <td className="px-4 py-2">{leave.to}</td>
                      <td className="px-4 py-2">{leave.reason}</td>
                      <td className="px-4 py-2 font-semibold">{leave.status}</td>
                      <td className="px-4 py-2 space-x-2">
                        {leave.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(index, "Approved")}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(index, "Rejected")}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
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

export default AdminLeaveRequests;
