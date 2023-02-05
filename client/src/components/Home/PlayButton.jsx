import React, { useContext } from "react";
import { UserContext } from "../../App";
import { io } from "socket.io-client";

export default function PlayButton() {
  // const user = useContext(UserContext);
  const socket = io("http://10.2.10.51:3001")

  function onPlay() {

  }

  function openSocket() {}

  return (
    <button className="PlayButton" type="button" onClick={onPlay}>
      Play
    </button>
  );
}
