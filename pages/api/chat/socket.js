import { Server } from "socket.io";
import { connect } from "socket.io-client";

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
    });

    res.socket.server.io = io;

  }

  res.end();
};