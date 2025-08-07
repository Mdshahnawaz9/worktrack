import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];

    if (currentUser) {
      setAdminName(currentUser.name);
    }

    setFeedbackList(allFeedback);
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Employee Feedbacks</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Feedbacks" value={feedbackList.length} />
          <StatCard title="Admin Logged In" value={adminName} />
        </div>

        {feedbackList.length === 0 ? (
          <p className="text-gray-500">No feedbacks available yet.</p>
        ) : (
          <div className="bg-white p-4 shadow rounded-lg">
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Employee Name</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{item.employeeName}</td>
                    <td className="p-2 border">{item.message}</td>
                    <td className="p-2 border">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminFeedback;
