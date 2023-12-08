import '../style/register.scss'

export default function page() {
  return (
    <div className="register">

      
      <form method="POST" action="/api/auth/signup">
        <h2>회 원 가 입</h2>
        <div className="formBox">
          <label>이름:</label>
          <input type="text" name="name" />
        </div>
        <div className="formBox">
          <label>닉네임:</label>
          <input type="text" name="nickname" />
        </div>
        <div className="formBox">
          <label>이메일:</label>
          <input type="email" name="email" />
        </div>
        <div className="formBox">
          <label>비밀번호:</label>
          <input type="password" name="password" />
        </div>
        <div className="formBox">
          <label>비밀번호 확인:</label>
          <input type="password" name="passwordCheck" />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}