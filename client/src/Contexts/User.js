import { useEffect, useState } from "react";
import { UserContext } from "../App";

function User(props) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const setUser = (userInfo) => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setUsername(userInfo.username);
    setIsAuth(true);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      return await fetch("http://localhost:3001/getSessionInfo", {
        credentials: "include",
      });
    };

    getUserInfo().then((res) => {
      if (res.status === 200) res.json().then((res) => setUser(res));
    });
  }, [window.onload]);

  const user = {
    firstName,
    lastName,
    email,
    username,
    isAuth,
    setUser,
  };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default User;
