import { connectDB } from "@/util/database";

export default async (req, res) => {
  if (req.method === "POST") {
    const message = req.body;

    // const db = (await connectDB).db('carrotChat')
    // let result = await db.collection(message.chatRoomId).insertOne({
    //   sendId : message.userId,
    //   message : message.message
    // })
    // console.log('Message emitted:', message);
    
    res.socket.server.io.emit('message', message);


    res.status(201).end();
  }
};