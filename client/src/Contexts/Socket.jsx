import React, { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export default function Socket(props) {
  const socket = io("10.2.10.51:3001", { withCredentials: true });
  return (
  <SocketContext.Provider value={socket}>
    {props.children}
  </SocketContext.Provider>
  );
}
