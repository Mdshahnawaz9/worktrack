import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Admin login
    if (form.username === "admin" && form.password === "admin123") {
      localStorage.setItem("user", JSON.stringify(form));
      localStorage.setItem("role", "admin");
      navigate("/admindashboard");
      return;
    }

    // User login
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.username === form.username &&
      storedUser.password === form.password
    ) {
      localStorage.setItem("role", "user");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Login
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
