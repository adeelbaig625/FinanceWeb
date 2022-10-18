import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export const AuthGuard = ({ children }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default AuthGuard;
