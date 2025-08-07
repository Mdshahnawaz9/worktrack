// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
