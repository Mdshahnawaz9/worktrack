import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatCard from "../components/StatCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(currentUser);

    if (currentUser) {
      const stored = JSON.parse(
        localStorage.getItem(`tasks-${currentUser.username}`)
      ) || [];
      setTasks(stored);
    }
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const updated = [...tasks, { task: newTask, completed: false }];
    setTasks(updated);
    localStorage.setItem(`tasks-${user.username}`, JSON.stringify(updated));
    setNewTask("");
  };

  const toggleComplete = (i) => {
    const updated = tasks.map((t, idx) =>
      idx === i ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem(`tasks-${user.username}`, JSON.stringify(updated));
  };

  const deleteTask = (i) => {
    const updated = tasks.filter((_, idx) => idx !== i);
    setTasks(updated);
    localStorage.setItem(`tasks-${user.username}`, JSON.stringify(updated));
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-semibold">My Tasks</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Tasks" value={tasks.length} />
          <StatCard
            title="Completed"
            value={tasks.filter((t) => t.completed).length}
          />
          <StatCard
            title="Pending"
            value={tasks.filter((t) => !t.completed).length}
          />
        </div>

        {/* Create new Task */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task"
              className="border rounded px-3 py-2 w-full"
            />
            <Button variant="primary" className="w-full sm:w-auto" onClick={addTask}>
              Add Task
            </Button>
          </div>
        </Card>

        {/* Tasks list */}
        <Card title="Task List">
          {tasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No tasks available.</p>
          ) : (
            <div className="space-y-2">
              {tasks.map((t, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white dark:bg-gray-800 rounded px-4 py-2 shadow"
                >
                  <span
                    className={`flex-1 ${
                      t.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {t.task}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant={t.completed ? "secondary" : "success"}
                      onClick={() => toggleComplete(i)}
                      className="text-xs"
                    >
                      {t.completed ? "Undo" : "Done"}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteTask(i)}
                      className="text-xs"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
