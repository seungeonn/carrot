import { connectDB } from "@/util/database";

export default async function handler (req, res) {
  if (req.method === "POST") {
    const message = req.body;

    const db = (await connectDB).db('carrotChat')
    let result = await db.collection(message.chatRoomId).insertOne({
      sendId : message.userId,
      message : message.message
    })
    
    
    res.status(200).json(message);
  }
};