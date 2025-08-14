import React from "react";

export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 ${className}`}>
      {title && (
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
