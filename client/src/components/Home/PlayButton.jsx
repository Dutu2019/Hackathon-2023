import React, { useContext } from "react";
import { UserContext } from "../../Contexts/User";

export default function PlayButton({ onClick }) {
  const user = useContext(UserContext);

  return (
    user.isAuth && (
      <button type="submit" onClick={onClick}>
        Play
      </button>
    )
  );
}
