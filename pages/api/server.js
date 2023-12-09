// // pages/api/server.js

// import express from 'express';
// import cors from 'cors';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// const app = express();
// app.use(cors())
// const httpServer = createServer(app);
// const io = new Server(httpServer);

// // Connection 이벤트 리스너 등록
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // 방 입장 이벤트 처리
//   // socket.on('joinRoom', (room) => {
//   //   socket.join(room);
//   // });

//   // Disconnect 이벤트 리스너 등록
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// httpServer.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// app.get('/socket.io/*', (req, res) => {
//   // 라우팅 로직 구현 (예: 무시하거나 404 응답 보내기)
//   res.status(404).end();
// });

// export { io };