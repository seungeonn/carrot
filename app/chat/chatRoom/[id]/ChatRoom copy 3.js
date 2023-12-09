// ChatRoom.js (클라이언트 측 코드)

'use client'

import { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000', { withCredentials: true });

const ChatRoom = ({ session, chatRoomId }) => {
  const [sendMessage, setSendMessage] = useState('');
  const [chat, setChat] = useState([]);
  const joinRoom = chatRoomId

  useEffect(() => {
    // 방에 조인하는 이벤트를 서버로 전송
    // socket.emit('joinRoom', joinRoom);

    // 실시간으로 메시지를 수신하는 이벤트 리스너 등록
    socket.on('newMessage', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      socket.off('newMessage');
    };
  }, [chatRoomId]);

  const sendMessageHandler = useCallback(
    (event) => {
      setSendMessage(event.target.value);
    },
    [sendMessage]
  );

  const enterKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitSendMessage(event);
    }
  };

  const submitSendMessage = async () => {
    if (sendMessage) {
      const message = {
        user: session.user.name,
        userId: session.user._id,
        chatRoomId: chatRoomId,
        sendId: session.user._id,
        message: sendMessage,
      };

      // 서버에 새로운 메시지 전송
      await axios.post('/api/chatting', message);

      // 입력 필드 초기화
      setSendMessage('');
    }
  };

  return (
    <div className="chatRoom">
      <div className="chat">
        {chat.length ? (
          chat.map((a, i) => (
            <div className="chat-message" key={i}>
              {a.sendId === session.user._id ? "나" : '상대방'} : {a.message}
            </div>
          ))
        ) : (
          <div className="alert-message">No Chat Messages</div>
        )}
      </div>
      <div className="sendMsg">
        <input type="text" value={sendMessage} onChange={sendMessageHandler} onKeyUp={enterKeyPress} />

        <button type="submit" onClick={submitSendMessage}></button>
      </div>
    </div>
  );
};

export default ChatRoom;