'use client'

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="loginBox" style={{width : '100vw', height : '100vh'}}>
      <button className="loginBtn" onClick={()=>{signIn()}} style={{
        width :'200px', height : '50px', borderRadius : '10px', border : 0, fontSize : '1.4rem',
        fontWeight : 'bold', position : 'absolute', top : '50%', left : '50%', transform : 'translate(-50%,-50%)',
        cursor : 'pointer'
      }}>로 그 인</button>
    </div>
  );
}

export {Login}