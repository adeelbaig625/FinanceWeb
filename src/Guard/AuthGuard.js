import React from "react";
import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export const AuthGuard = () => {
  const auth = useAuth();

  const location = useLocation();
  const outlet = useOutlet();
  if (!auth.user) {
    return (
      <Navigate to="/" replace={true} state={{ path: location.pathname }} />
    );
  }
  return <>{outlet}</>;
};

export default AuthGuard;
