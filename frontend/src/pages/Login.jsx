import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkModeProvider";

const Login = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <button onClick={toggleDarkMode} className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full mb-3 p-2 border rounded dark:bg-gray-700"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full mb-3 p-2 border rounded dark:bg-gray-700"/>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        <p className="text-sm text-center mt-3 text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
          Don't have an account? Sign up
        </p>
      </form>
    </div>
  );
};

export default Login;
