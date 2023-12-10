import { connectDB } from "@/util/database";
import Link from "next/link";
import '../../style/detail.scss'
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Comment from './Comment'

export default async function Detail(props) {

  const db = (await connectDB).db('carrot')
  const db2 = (await connectDB).db('carrotComment')
  let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)})
  let result2 = await db2.collection(String(props.params.id)).find().toArray();
  console.log(result);

  let session = await getServerSession(authOptions)

  let writerId = result.user_id
  let loginId = session ? session.user._id : null


  return (
    <div className="detail">

      {
        writerId == loginId ?
        <div className="userSelf">
          <Link href={'/edit/'+ props.params.id}>수정</Link>
          <form action={"/api/post/delete?postId=" + props.params.id} method="POST"><button type="submit">삭제</button></form>
        </div>
      : null
      }
      
      {
          <div className="box">
            <div className="imgBox">
              {
                JSON.parse(result.imgUrl).map((a,i)=>{
                  return(
                    <div className="img"><img src={a} alt={i} /></div>
                  )
                })
              }
            </div>
            <div className="text">
              <div className="userInformation">
                <div className="userName">{result.nickname}<span> 님의 판매</span></div>
                <div className="userEmail">{result.email}</div>
              </div>
              <div className="contentBox">
                <div className="title">{result.title}</div>
                <div className="content">{result.content}</div>
              </div>
                <div className="priceBox">
                  <div className="price">{result.price}원</div>
                  {/* <form action={"/api/chat/chatBtn?postId=" + props.params.id + '&loginId=' + loginId + '&writerId=' + writerId} method="POST">
                    {
                      session ? session.user._id == writerId ? null :
                      <button className="chatBtn" type="submit">채팅하기</button> : null
                    }
                  </form> */}
                </div>
            </div>
          </div>
      }

      <Comment result2={result2} session={session} postId={props.params.id} result={result}></Comment>

    </div>
  )
}
