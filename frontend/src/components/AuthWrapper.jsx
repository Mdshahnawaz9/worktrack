// src/components/AuthWrapper.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthWrapper;
