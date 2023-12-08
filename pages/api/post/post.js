import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {

  let session = await getServerSession(req, res ,authOptions)
  const db = (await connectDB).db('carrot')
  
  
  req.body.email = session.user.email
  req.body.name = session.user.name
  req.body.user_id = session.user._id
  req.body.nickname = session.user.nickname
  
  await db.collection('post').insertOne(req.body)

  res.status(200).redirect(302, '/')
}