'use client'

import { useRouter } from "next/navigation";

export default function Comment({result2 , session, postId , result}) {

  const router = useRouter()
  
  let today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var hours = ('0' + today.getHours()).slice(-2); 
  var minutes = ('0' + today.getMinutes()).slice(-2);
  // var seconds = ('0' + today.getSeconds()).slice(-2); 

  var timeString = hours + ':' + minutes;
  var dateString = year + '-' + month  + '-' + day;
  
  var now = dateString+ '\u00a0' + timeString
  
  return (
    <div className="commentArea">
      <h2>댓글</h2>
      <div className="commentBox">
        {result2.length ?
          result2.map((a,i)=>{
            return (
              <div className="comment" key={i}>
              <div className="userComment"> <span>{a.userNickname} : </span> {a.comment}</div>
              <div className="userDate">{a.date}</div>
            </div>
            )
          })
          : <div style={{fontSize : '1.4rem', marginBottom :'20px' }}>아직 댓글이 없습니니다</div>
        }
      </div>

      <form
  method="POST"
  action="/api/comment"
  onSubmit={async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 막기

    // API 호출
    const response = await fetch('/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: e.target.elements.comment.value,
        date: now,
        userId: session.user._id,
        userName: session.user.name,
        userNickname: session.user.nickname,
        postId: postId,
      }),
    });

    if (response.ok) {
      // 페이지 업데이트
      router.refresh();

      // 입력 필드 초기화
      e.target.elements.comment.value = '';
    } else {
      console.error('API 호출 실패');
    }
  }}
>
        <input type="text" className="inputComment" name="comment"/>
        <input type="text" name="date" defaultValue={now} style={{display: 'none'}}/>
        <input type="text" name="userId" defaultValue={session.user._id} style={{display: 'none'}}/>
        <input type="text" name="userName" defaultValue={session.user.name} style={{display: 'none'}}/>
        <input type="text" name="userNickname" defaultValue={session.user.nickname} style={{display: 'none'}}/>
        <input type="text" name="postId" defaultValue={postId} style={{display: 'none'}}/>
        <button type="submit" >댓글달기</button>
      </form>
    </div>
  );
}

export {Comment}