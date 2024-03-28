import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.authorization.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;