import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Optional alternative guard (if you prefer Route wrappers).
 * Usage:
 * <Route path="/admin/..." element={<ProtectedRoute admin><AdminPage/></ProtectedRoute>} />
 */
export default function ProtectedRoute({ admin = false, children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (admin && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
