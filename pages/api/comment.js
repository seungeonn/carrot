import { connectDB } from "@/util/database";

export default async function comment(req, res) {
  const db = (await connectDB).db('carrotComment');

  // 예상되는 데이터 형식 확인
  let commentData = {
    comment: req.body.comment,
    date: req.body.date,
    userId: String(req.body.userId), // 문자열로 변환
    userName: req.body.userName,
    userNickname: req.body.userNickname,
    postId: String(req.body.postId), // 문자열로 변환
  };

  await db.collection(String(commentData.postId)).insertOne(commentData);
  console.log(commentData);
  res.status(200).end(); // 작업이 끝났으면 여기서 응답 종료
}