'use client'

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
// import { Client } from "socket.io/dist/client";

export default function ChatRoom({session}) {

  const [sendMessage, setSendMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState([]);

  useEffect(()=>{
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.NEXT_PUBLIC_API_URL, {
      path: "/api/chat/socket",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnect on component unmount if exists
    if (socket) return () => socket.disconnect();
  }, [])
  
  const sendMessageHandler = useCallback(
    (event) => {
      setSendMessage(event.target.value);
    },
    [sendMessage]
  );
  const enterKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // send message
      event.preventDefault();
      submitSendMessage(event);
    }
  };

  const submitSendMessage = async (
    event
  ) => {
    event.preventDefault();
    if (sendMessage) {
      const message = {
        user: session.user.name,
        message: sendMessage,
      };

      const response = await axios.post("/api/chat", message);
      setSendMessage("");
    }
  };
  
  return (
    <div className="chatRoom">
      <div className="chat">
        {chat.length ? (
          chat.map((chat, index) => (
            <div className="chat-message" key={index}>
              {chat.user === session.user.name ? "Me" : chat.user} : {chat.message}
            </div>
          ))
        )
        :(
          <div className="alert-message">No Chat Messages</div>
        )}
      </div>
      <div className="sendMsg">
        <input type="text" value={sendMessage} onChange={sendMessageHandler} onKeyUp={enterKeyPress}
        placeholder={connected ? "enter your message" : "Connecting...🕐"} />

        <button type="submit" onClick={submitSendMessage}></button>
      </div>
    </div>
  );
}

export{ ChatRoom}