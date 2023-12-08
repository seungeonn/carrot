import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req,res) {
  if(req.method == 'POST'){
    let db = (await connectDB).db('carrot')

    if(req.body.password == '' || req.body.name == '' || req.body.email === '' || req.body.nickname === ''){
      return res.status(500).json('빈칸을 채워주세요')
    }

    
    if(await db.collection('user_cred').findOne({email : req.body.email})){
      return res.status(500).json('이미 존재하는 이메일입니다.')
    }

    if(await db.collection('user_cred').findOne({nickname : req.body.nickname})){
      return res.status(500).json('이미 존재하는 이메일입니다.')
    }

    let password = await bcrypt.hash(req.body.password, 10)
      req.body.password = password
      await db.collection('user_cred').insertOne(req.body)
      return res.status(200).redirect(302,'/')
  }
}