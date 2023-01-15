import React, { useEffect, useState } from "react";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  // Retrieves the messages each second
  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Gets the messages from the server
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

  // Puts all the messages in a variable
  var messageContainer = messages.map((object) => {
    return (
      <div>
        {object.user}: {object.message}
      </div>
    );
  });

  // Posts the User's message to the server
  function submit(e) {
    if (e.key === "Enter" && e.target.value !== "") {
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
      <input
        type="text"
        onKeyDown={(e) => {
          submit(e);
        }}
      />
    </div>
  );
}
