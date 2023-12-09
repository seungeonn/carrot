// // pages/api/chatting.js
// import { connectDB } from "@/util/database";
// import { io } from './server'; // Socket.IO 서버 객체를 가져옴

// const handler = async (req, res) => {
//   // API 로직은 여기에 작성

//   if (req.method === "POST") {
//     const message = req.body;

//     const db = (await connectDB).db('carrotChat');
//     await db.collection(message.chatRoomId).insertOne({
//       sendId: message.userId,
//       message: message.message
//     });

//     // 실시간으로 메시지를 전달
//     io.to(message.chatRoomId).emit('newMessage', message);

//     res.status(200).json({ success: true });
//   } else if (req.method === "GET") {
//     // 채팅 조회 로직 구현
//     res.status(200).json({ success: true, messages: [] });
//   } else {
//     res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   }
// };

// export { handler };