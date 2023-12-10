'use client'

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link'

export default function Header({session}) {
  return (
    <div className='navbar'>
    <div className="nav">
      <Link href="/" className="logo">
        🥕당근
      </Link>
      <Link href="/post">
        내 물건 팔기
      </Link>
      {/* <Link href="/chat/chatList">
        채팅
      </Link> */}
      {/* <Link href="/write">
        이모저모
      </Link> */}
    </div>

    <div className="left">

      {
        session ?       
        <div className='loginSuccess'>
          <div className='userName'><span>{session.user.nickname}</span> 님 안녕하세요!</div>
          {/* <div className='mypage'> 마이페이지</div> */}
          <button onClick={()=>{signOut()}} style={{cursor : 'pointer'}}>로그아웃</button>
        </div>
        
      : 
      <div className='btn'>
          <button className='login' onClick={()=>{signIn()}}>로그인 </button>
          <span> / </span>
          <button className='register'><Link href={'/register'}>회원가입</Link></button>
        </div>
      }
      
      {/* <div className='searchBar'>
        <form action="/api/search" method='POST'>
          <input type="text" name='search' />
          <button type='submit'>🔎</button>
        </form>
      </div> */}
    </div>
    
  </div>
  );
}

export {Header}