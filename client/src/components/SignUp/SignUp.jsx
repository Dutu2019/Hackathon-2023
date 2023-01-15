import "./SignUp.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";

const SignUp = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState();

  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();

  useEffect(() => {
    setResponse();
  }, [firstName, lastName, username, email, password]);

  const submitForm = async () => {
    const res = await fetch("http://10.2.10.51:3001/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.current,
        lastName: lastName.current,
        username: username.current,
        email: email.current,
        password: password.current,
      }),
    });

    if (res.status === 200)
      navigate("/login", { state: { message: await res.text() } });
    else {
      setResponse({ status: res.status, message: await res.text() });
      setTimeout(() => {
        setResponse();
      }, 3000);
    }
  };

  return (
    <div className="SignUp">
      {response && (
        <Popup children={response.message} unmount={() => setResponse()} />
      )}

      <div className="title">Sign Up</div>
      <div className="container">
        <div className="scroll-container">
          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => {
              firstName.current = e.target.value;
            }}
          />
          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) => {
              lastName.current = e.target.value;
            }}
          />
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              username.current = e.target.value;
            }}
          />
          <label>Email</label>
          <input
            type="email"
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
        </div>
        <button type="submit" onClick={submitForm}>
          Sign up
        </button>
      </div>
    </div>
  );
};
export default SignUp;
