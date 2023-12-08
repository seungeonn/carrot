import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page() {

  let session = await getServerSession(authOptions)
  
  const db = (await connectDB).db('carrot')
  let result = await db.collection('chatRoom').find({loginId : session.user._id}).toArray()
  console.log(result[0]);

  
  let nickname = []

  await Promise.all(result.map(async (chatRoom) => {
    let result2 = await db.collection('user_cred').findOne({ _id: new ObjectId(chatRoom.writerId) });
    nickname.push(result2.nickname);
  }));
  
  return (
    // <ChatList result={result} result2={result2} session={session}></ChatList>
    <div className="chatList">
    {
      result.map((a,i)=>{
        return(
          <div className="list" key={i}>
            <div className="chatName"><Link href={'/chat/chatRoom/'+ String(result[i]._id)}>{nickname[i]}님과의 대화!</Link></div>
          </div>
        )
      })
    }
  </div>
  );
}