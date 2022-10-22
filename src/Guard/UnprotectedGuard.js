import React from "react";
import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export const UnprotectedGuard = () => {
  const auth = useAuth();
  console.log(auth);
  const location = useLocation();
  const outlet = useOutlet();
  if (auth.user) {
    return (
      <Navigate to="/home" replace={true} state={{ path: location.pathname }} />
    );
  }
  return <>{outlet}</>;
};

export default UnprotectedGuard;
