import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getMessages = () => {
    fetch("http://10.2.10.51:3001/messages", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessages(data);
      });
  };

  var messageContainer = messages.map((object) => {
    return (
      <div>
        {object.user}: {object.message}
      </div>
    );
  });

  const input = (
    <input
      type="text"
      onKeyDown={(e) => {
        submit(e);
      }}
    />
  );

  function submit(e) {
    if (e.key === "Enter") {
      fetch("http://10.2.10.51:3001/postMessages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: e.target.value }),
      });
      e.target.value = "";
      getMessages();
    }
  }

  return (
    <div className="Chat">
      <div className="messages">{messageContainer}</div>
      {input}
    </div>
  );
}
