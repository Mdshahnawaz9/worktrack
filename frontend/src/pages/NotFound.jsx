import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
