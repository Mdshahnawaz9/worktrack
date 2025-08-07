import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("feedbacks")) || [];
    const myFeedbacks = stored.filter(f => f.username === user?.username);
    setAllFeedbacks(myFeedbacks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    const newEntry = {
      id: Date.now(),
      username: user.username,
      feedback,
      date: new Date().toLocaleString()
    };

    const updated = [...(JSON.parse(localStorage.getItem("feedbacks")) || []), newEntry];
    localStorage.setItem("feedbacks", JSON.stringify(updated));

    setAllFeedbacks(prev => [newEntry, ...prev]);
    setFeedback("");
  };

  return (
    <Layout>
      <StatCard title="Feedback" value={`${allFeedbacks.length} Entries`} />
      <div className="max-w-xl mx-auto mt-4">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <textarea
            className="w-full p-3 rounded border dark:bg-gray-900 dark:text-white"
            rows="4"
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {allFeedbacks.map((f) => (
            <div key={f.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{f.date}</p>
              <p className="text-lg text-gray-800 dark:text-white">{f.feedback}</p>
            </div>
          ))}
          {allFeedbacks.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-300">No feedback submitted yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
