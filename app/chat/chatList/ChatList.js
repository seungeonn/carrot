// 'use client'

// import { useEffect, useState } from "react";

// export default function ChatList({result, nickname, session}) {

//   let [nick, setNick] = useState([])

//   useEffect(()=>{
//     let copy = [...nickname]
//     console.log(session);
//     setNick(copy)
//     console.log(nick);
//   },[])
  
//   return (
//     <div className="chatList">
//     {
//       nick.map((a,i)=>{
//         console.log(nickname);
//         return(
//           <div className="list">
//             <p className="chatName">{a}님과의 대화</p>
//           </div>
//         )
//       })
//     }
//   </div>
//   );
// }

// export {ChatList}