import React from "react";

export default function StatCard({ title, value, onClick, color = "indigo" }) {
  const clickable = typeof onClick === "function";
  const base =
    "rounded-xl shadow p-4 sm:p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition";
  const hover = clickable ? " cursor-pointer hover:shadow-md" : "";

  return (
    <div className={base + hover} onClick={onClick}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className={`mt-2 text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>
        {value}
      </p>
    </div>
  );
}
