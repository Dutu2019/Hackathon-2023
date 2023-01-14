import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";

export default function Chat() {
  const messages = useRef([]);
  const messageContainer = useRef();
  const inputValue = useRef();

  useEffect(() => {
    const getMessages = () => {
      fetch("http://172.29.1.18:3001/messages", {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          messages.current = data;
          const container = document.createElement("div");
          messages.current.forEach((object) => {
            const messageDiv = document.createElement("div");
            messageDiv.innerHTML = `${object.user}: ${object.message}`;
            container.appendChild(messageDiv);
          });
          messageContainer.current.replaceChildren(container);
        });
    };
    const interval = setInterval(() => {
      getMessages();
    }, 1000);

    const input = document.querySelector("input");
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && inputValue.current) {
        fetch("http://172.29.1.18:3001/postMessages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message: inputValue.current }),
        });
        input.value = "";
        getMessages();
      }
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="Chat">
      <div className="messages" ref={messageContainer}></div>
      <input
        type="text"
        className="messageInput"
        onChange={(e) => {
          inputValue.current = e.target.value;
        }}
      />
    </div>
  );
}
