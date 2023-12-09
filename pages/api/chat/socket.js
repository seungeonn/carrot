// pages/api/chat/socket.js

// import { Server } from "socket.io";
import { Server } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (!res.socket.server.io) {
    
    const httpServer = res.socket.server;
    const io = new Server(httpServer, {
      path: "/api/chat/socket",
      cors: {
        origin: "https://carrot-plum.vercel.app",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },

    });

    // Connection 이벤트 리스너 등록
    io.on("connection", (socket) => {
      console.log(`A user connected: ${socket.id}`);

      // Join 이벤트 처리
      socket.on("join", (data) => {
        socket.join(data.room);
        console.log(`Socket ${socket.id} joined room ${data.room}`);

        // 클라이언트에게 방에 조인되었다는 신호 전송
        socket.emit("joinedRoom");

        // 클라이언트가 조인한 방의 정보 확인
        const joinedRooms = Array.from(socket.rooms);
        console.log(`Socket ${socket.id} joined rooms: ${joinedRooms}`);
      });

      // Disconnect 이벤트 리스너 등록
      socket.on("disconnect", () => {
        console.log(`A user disconnected: ${socket.id}`);
      });

      // 메시지 이벤트 처리
      socket.on("message", (message) => {
        // 클라이언트가 조인한 방으로 메시지 브로드캐스트
        socket.to(message.chatRoomId).emit("message", message);
      });
    });


    res.socket.server.io = io;

  }

  res.end();
};