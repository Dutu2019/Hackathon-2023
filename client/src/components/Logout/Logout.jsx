import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/User";

export default function Logout() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const getLogout = async () => {
    return await fetch(`${process.env.REACT_APP_SERVER_IP}/logout`, {
      credentials: "include",
    });
  };

  function logout() {
    getLogout().then((res) => {
      if (res) {
        user.setUser({});
        navigate("/");
      }
    });
  }

  return (
    <div onClick={logout} style={{ cursor: "pointer" }}>
      Logout
    </div>
  );
}
