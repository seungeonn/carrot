// // pages/api/chat/index.js

// import { connectDB } from "@/util/database";

// export default async (req, res) => {
//   if (req.method === "POST") {
//     const message = req.body;

//     // const db = (await connectDB).db('carrotChat')
//     // let result = await db.collection(message.chatRoomId).insertOne({
//     //   sendId : message.userId,
//     //   message : message.message
//     // })
//     // console.log('Message emitted:', message);
    
//     res.socket.server.io.emit('message', message);


//     res.status(201).json(message);
//   } else {
//     res.status(405).json({ success: false, message: 'index.js에서 실패' })
//   }
// };