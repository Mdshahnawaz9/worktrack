import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-center px-4">
      <div className="max-w-2xl bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to WorkTrackPro</h1>
        <p className="text-gray-600 mb-6">
          Smart Employee Performance & Task Management System by <strong>Md Shahnawaz</strong>.
        </p>

        {currentUser ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
