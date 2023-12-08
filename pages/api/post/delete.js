import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const db = (await connectDB).db('carrot')
  await db.collection('post').deleteOne({_id : new ObjectId(req.query.postId)})
  
  return res.status(200).redirect(302, '/')
}
