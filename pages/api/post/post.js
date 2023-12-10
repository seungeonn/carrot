import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {

  let session = await getServerSession(req, res ,authOptions)
  const db = (await connectDB).db('carrot')
  const db2 = (await connectDB).db('carrotComment')
  
  
  req.body.email = session.user.email
  req.body.name = session.user.name
  req.body.user_id = session.user._id
  req.body.nickname = session.user.nickname
  
  await db.collection('post').insertOne(req.body)

  let result = await db.collection('post').findOne(req.body)

  await db2.createCollection(String(result._id))

  res.status(200).redirect(302, '/detail/' + String(result._id))
}