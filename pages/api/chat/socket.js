
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "https://elegant-cat-5ee04e.netlify.app",
//   },
// });

// // io.on('connection', (socket) => {
// //   console.log(`A user connected: ${socket.id}`);

// //   // Handle 'message' event
// //   socket.on('message', (message) => {
// //     // Broadcast the message to all connected clients
// //     io.emit('message', message);
// //   });

// //   // Handle 'disconnect' event
// //   socket.on('disconnect', () => {
// //     console.log(`A user disconnected: ${socket.id}`);
// //   });
// // });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default (req, res) => {
//   if (!res.socket.server.io) {
//     // Express 서버에 WebSocket 설정 추가
//     httpServer.listen(3001, () => {
//       console.log('WebSocket server is running on port 3001');
//     });

//     res.socket.server.io = io;
//   }

//   res.end();
// };