import React, { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export default function Socket(props) {
  const socket = io(process.env.REACT_APP_SERVER_IP, {
    withCredentials: true,
    transports: ["websocket"],
  });
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}
