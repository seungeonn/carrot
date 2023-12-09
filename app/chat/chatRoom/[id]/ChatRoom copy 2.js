'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ChatRoom({session, chatRoomId, result}) {

  let router = useRouter()
  const [sendMessage, setSendMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState([]);

  let [newChat, setNewChat] = useState(result)

  useEffect(()=>{

  },[])
  
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

      const response = await axios.post("/api/chat/chatDb", message);
      setSendMessage("");
      setNewChat((prevChat) => [...prevChat, response.data]);
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
        <input type="text" value={sendMessage} onChange={sendMessageHandler} onKeyUp={enterKeyPress}/>

        <button type="submit" onClick={submitSendMessage}></button>
      </div>
    </div>
  );
}

export{ ChatRoom}