// import Chat from "@/pages/api/chat";
// import ChatRoom from "./ChatRoom";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { connectDB } from "@/util/database";

// export default async function page(props) {

//   let session = await getServerSession(authOptions)
//   let chatRoomId = props.params.id

//   const db = (await connectDB).db('carrotChat')
//   let result = await db.collection(chatRoomId).find().toArray()
  
//   return (
//     <ChatRoom session={session} chatRoomId={chatRoomId} result={result}></ChatRoom>
//   );
// }