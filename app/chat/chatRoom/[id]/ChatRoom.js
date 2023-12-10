// app/chat/chatRoom/ChatRoom.js

'use client'

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";

export default function ChatRoom({session, chatRoomId, result}) {

  const [sendMessage, setSendMessage] = useState("");
  const [connected, setConnected] = useState(false);
  // const [joinedRoom, setJoinedRoom] = useState(false); // 방에 조인 여부 상태 추가
  // const [chat, setChat] = useState(result);
  const chat = result

  let [newChat, setNewChat] = useState([])

  useEffect(()=>{
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.PUBLIC.NEXT.API.URL, {
      path: "/api/chat/socket"
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);

      // socket.emit("join", { room: chatRoomId });
      // console.log("join");
      // setJoinedRoom(true);
      // console.log(joinedRoom);
    });

    // 방에 조인 여부 확인
    // socket.on("joinedRoom", () => {

    // });

    
    
    // update chat on new message dispatched
    socket.on("message", (message) => {
      // newChat.push(message);
      // setChat((prevChat) => [...prevChat, message]);
      newChat.push(message);
      setNewChat([...newChat]);
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
      {/* {joinedRoom && (
          <div className="alert-message">방에 조인되었습니다!</div>
        )} */}
        {newChat.length ? (
          newChat.map((a, i) => (
            <div className="chat-message" key={i}>
              {a.sendId === session.user._id ? "나" : '상대방'} : {a.message}
            </div>
          ))
        )
        :(
          <div className="alert-message">메세지가 없습니다!</div>
        )}
      </div>
      <div className="sendMsg">
        <input type="text" value={sendMessage} onChange={sendMessageHandler} onKeyUp={enterKeyPress}
        placeholder={connected ? "입력해주세요!" : "연결중입니다..."} />

        <button type="submit" onClick={submitSendMessage}></button>
      </div>
    </div>
  );
}

export{ ChatRoom}