// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeProvider";

const Login = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [form, setForm] = useState({ name: "", password: "" });

  // Already logged in? → Dashboard
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.name === form.name &&
      storedUser.password === form.password
    ) {
      // Store only username
      localStorage.setItem("loggedInUser", storedUser.name);

      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded transition-colors duration-300"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80 transition-colors duration-300"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Login
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Username"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </button>

        <p
          className="text-sm text-center mt-3 text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up
        </p>
      </form>
    </div>
  );
};

export default Login;
