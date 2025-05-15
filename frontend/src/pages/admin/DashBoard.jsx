import React, { useEffect, useState } from "react";
import MembershipTable from "../../components/admin/MembershipTable";
import UsersTable from "../../components/admin/UsersTable";
import TranersTable from "../../components/admin/TranersTable";
import { useNavigate } from "react-router-dom";
import GroupSessionTable from "../../components/admin/GroupSessionTable";

const DashBoard = () => {
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthData = { 
      token: localStorage.getItem("token"),
      role: localStorage.getItem("type"),
      username: localStorage.getItem("username"),
    }
    setAuthData(storedAuthData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("membershipPlanName");
    navigate("/login");
  };

  if (!authData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <UsersTable token={authData.token} />
      <TranersTable token={authData.token} />
      <MembershipTable token={authData.token} />
      <GroupSessionTable token={authData.token} />
      <button
        style={{
          marginTop: "32px",
          padding: "10px 32px",
          background: "#222",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "18px",
          cursor: "pointer"
        }}
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default DashBoard;