import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Guards routes using localStorage-based auth.
 * If path starts with /admin, user.role must be 'admin'.
 */
export default function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (pathname.startsWith("/admin") && user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, pathname]);

  return <>{children}</>;
}
