import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../DB/FirestoreQueries";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../Context/AuthContext";
function Header() {
  const navigate = useNavigate();
  const auth = useAuth();

  const onLogout = () => {
    auth.onLogout().then(async (res) => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="header">
      <h1
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home", { replace: true })}
      >
        Finance App
      </h1>
      <div className="header-right-container">
        <div onClick={() => onLogout()}>Logout</div>
      </div>
    </div>
  );
}
export const MemoizedHeader = React.memo(Header);
