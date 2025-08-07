import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const AdminLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(storedRequests);
  }, []);

  const handleStatusChange = (index, status) => {
    const updatedRequests = [...leaveRequests];
    updatedRequests[index].status = status;
    setLeaveRequests(updatedRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">All Leave Requests</h1>
      {leaveRequests.length === 0 ? (
        <p className="text-center text-gray-500">No leave requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">From</th>
                <th className="border px-4 py-2">To</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{req.username}</td>
                  <td className="border px-4 py-2">{req.from}</td>
                  <td className="border px-4 py-2">{req.to}</td>
                  <td className="border px-4 py-2">{req.reason}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`font-bold ${
                        req.status === "approved"
                          ? "text-green-600"
                          : req.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleStatusChange(index, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleStatusChange(index, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default AdminLeaveRequests;
