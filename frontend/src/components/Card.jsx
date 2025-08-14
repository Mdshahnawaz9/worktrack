import React from "react";

export default function Card({ title, children, footer, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 sm:p-6 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      )}
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
      {footer && <div className="mt-4 border-t pt-3">{footer}</div>}
    </div>
  );
}
