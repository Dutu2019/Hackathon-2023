import "./Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Popup from "../Popup/Popup";
import { UserContext } from "../../App";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const email = useRef();
  const password = useRef();

  const [response, setResponse] = useState();

  const submitLogin = async () => {
    const res = await fetch("http://10.2.10.51:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email.current,
        password: password.current,
      }),
    });

    if (res.status === 200) {
      user.setUser(await res.json());
      navigate("/");
    } else {
      setResponse(await res.text());
    }
  };

  useEffect(() => {
    if (location.state && location.state.message) {
      setResponse(location.state.message);
    }
  }, [location]);

  useEffect(() => {
    setTimeout(() => setResponse(), 3000);
  }, [response]);

  return (
    <div className="login">
      {response && <Popup children={response} unmount={() => setResponse()} />}
      <h1 className="title">Login</h1>
      <div className="container">
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            email.current = e.target.value;
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            password.current = e.target.value;
          }}
        />
        <button type="submit" onClick={submitLogin}>
          Login
        </button>
        <Link to="/signUp">Sign up</Link>
      </div>
    </div>
  );
};
export default Login;
