'use client'

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";

export default function ChatRoom({session, chatRoomId, result}) {

  const [sendMessage, setSendMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState([]);

  let [newChat, setNewChat] = useState(result)

  useEffect(()=>{
    // connect to socket server
    const socket = SocketIOClient.connect('https://carrot-plum.vercel.app', {
      path: "/api/chat/socket"
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    
    
    // update chat on new message dispatched
    socket.on("message", (message) => {
      // console.log(message);
      // newChat.push(message);
      setNewChat((prevChat) => [...prevChat, message]);
      console.log(newChat);
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
        userId : session.user._id,
        chatRoomId : chatRoomId,
        sendId : session.user._id,
        message: sendMessage
      };

      const response = await axios.post("/api/chat", message);
      setSendMessage("");
    }
  };
  
  return (
    <div className="chatRoom">
      <div className="chat">
        {newChat.length ? (
          newChat.map((a, i) => (
            <div className="chat-message" key={i}>
              {a.sendId === session.user._id ? "나" : '상대방'} : {a.message}
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