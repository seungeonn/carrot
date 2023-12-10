// import { connectDB } from "@/util/database";

// export default async function chatBtn(req,res) {

//   const db = (await connectDB).db('carrot')
//   const db2 = (await connectDB).db('carrotChat')

//   let plus = req.query.writerId + req.query.loginId
//   let minus = req.query.loginId + req.query.writerId

//   let result
  
//   let find = await db.collection('chatRoom').findOne({plusId : plus})
//   let find1 = await db.collection('chatRoom').findOne({minusId : minus})
  
//   if(find){
//     result = find
//   } else if(find1) {
//     result = find1
//   } else {
//     req.query.plusId = plus
//     req.query.minusId = minus
//     await db.collection('chatRoom').insertOne(req.query)

//     result = await db.collection('chatRoom').findOne(req.query)
//   }

  
//   let chatRoomId = String(result._id)
  
//   let test = await db2.listCollections().toArray()
//   let a = test.find(collection => collection.name == chatRoomId)
//   console.log(a);
  
//   if(a){
//     return res.status(200).redirect(302,'/chat/chatRoom/'+chatRoomId)
//   } else {
//     await db2.createCollection(chatRoomId)
//     return res.status(200).redirect(302,'/chat/chatRoom/'+chatRoomId)
//   }
  

  
// }
