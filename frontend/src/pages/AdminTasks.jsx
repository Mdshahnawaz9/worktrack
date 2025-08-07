import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">All Users' Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <p><strong>User:</strong> {task.username}</p>
              <p><strong>Task:</strong> {task.task}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminTasks;
