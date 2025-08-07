import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);

    if (currentUser) {
      const storedTasks = JSON.parse(localStorage.getItem(`tasks-${currentUser.username}`)) || [];
      setTasks(storedTasks);
    }
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const updatedTasks = [...tasks, { task: newTask, completed: false }];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user.username}`, JSON.stringify(updatedTasks));
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user.username}`, JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${user.username}`, JSON.stringify(updatedTasks));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Tasks" value={tasks.length} />
        <StatCard title="Completed" value={tasks.filter((t) => t.completed).length} />
        <StatCard title="Pending" value={tasks.filter((t) => !t.completed).length} />
      </div>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white rounded shadow px-4 py-2"
            >
              <span
                className={`${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.task}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleComplete(index)}
                  className={`${
                    task.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white px-3 py-1 rounded`}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
