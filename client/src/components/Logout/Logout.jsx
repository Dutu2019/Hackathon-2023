import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Logout() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const getLogout = async () => {
    return await fetch("http://10.2.10.51:3001/logout", {
      credentials: "include",
    });
  };

  function logout() {
    getLogout().then((res) => {
      if (res) {
        user.setUser({});
        navigate("/chat");
      }
    });
  }

  return (
    <div onClick={logout} style={{ cursor: "pointer" }}>
      Logout
    </div>
  );
}
