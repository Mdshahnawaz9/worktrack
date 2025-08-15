import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function AdminLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(stored);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...leaveRequests];
    updated[index].status = status;
    setLeaveRequests(updated);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this request?")) {
      const updated = [...leaveRequests];
      updated.splice(index, 1);
      setLeaveRequests(updated);
      localStorage.setItem("leaveRequests", JSON.stringify(updated));
    }
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <Card title="Total Leave Requests">
          <p className="text-2xl font-bold">{leaveRequests.length}</p>
        </Card>

        <Card title="All Requests">
          {leaveRequests.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">
              No requests found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-auto">
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
                  {leaveRequests.map((leave, idx) => (
                    <tr
                      key={idx}
                      className="border-t text-center dark:border-gray-700"
                    >
                      <td className="px-4 py-2">{leave.username}</td>
                      <td className="px-4 py-2">{leave.from}</td>
                      <td className="px-4 py-2">{leave.to}</td>
                      <td className="px-4 py-2">{leave.reason}</td>
                      <td className="px-4 py-2 font-semibold">{leave.status}</td>
                      <td className="px-2 py-2 space-x-1">
                        {leave.status === "Pending" ? (
                          <>
                            <Button
                              variant="success"
                              className="text-xs"
                              onClick={() => updateStatus(idx, "Approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              className="text-xs"
                              onClick={() => updateStatus(idx, "Rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="danger"
                            className="text-xs"
                            onClick={() => handleDelete(idx)}
                          >
                            Delete
                          </Button>
                        )}
                      </td>
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
