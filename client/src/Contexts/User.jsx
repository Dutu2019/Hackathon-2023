import { useEffect, useState, createContext } from "react";

export const UserContext = createContext();
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
    setIsAuth(userInfo.auth);
  };

  useEffect(() => {
    const getUserinfo = async () => {
      try {
        const session = await fetch(
          `${process.env.REACT_APP_SERVER_IP}/getSessionInfo`,
          {
            credentials: "include",
          }
        );
        if (session.status === 200) {
          setUser(await session.json());
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserinfo();
  }, []);

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
