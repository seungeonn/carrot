'use client'

import { useEffect, useState } from "react";
import Login from '../Login'

export default function ImgUpload({session}) {

  const [src, setSrc] = useState([])

  let srcCopy 
  
  useEffect(()=>{
    srcCopy = document.querySelector('.imgUrl').value = JSON.stringify(src)
  },[src])

  return (
    <div className="post">
      <h2>내 물건 팔기</h2>
      
      <div className="camera">
        <input className="Upload" type="file" accept="image/*" multiple  onChange={async (e)=>{
          let f = Array.from(e.target.files)
        
          f.map(async (a,i)=>{
            let file = e.target.files[i]
            let filename = encodeURIComponent(file.name)
            let res = await fetch('/api/post/image?file=' + filename)
            res = await res.json()
            //S3 업로드
            const formData = new FormData()
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value)
            })
            let upload = await fetch(res.url, {
              method: 'POST',
              body: formData,
            })
            if (upload.ok) {
              setSrc(prevSrc => [...prevSrc, (upload.url + '/' + filename)]);
            } else {
              console.log('실패')
            }
          })
        
        
        }} />
        <div className="item">
          <div className="box" onClick={()=>{
            document.querySelector('.Upload').click()
          }}>
            <div className="imgIcon">📷</div>
            <div className="imgNum">{src.length  + ' / 3'}</div>
            <div className="mb">*한 장당 3MB</div>
          </div>
          {
            src.map((a,i)=>{
              return (
                <div className="box" key={i}><img className="img" src={a} alt={i} key={i}/></div>
              )
            })
          }
        </div>
      </div>
      
      <div className="form">
        <form method="POST" action="api/post/post">
          <label>제목</label>
          <input type="text" className="title" name="title" placeholder="제목" />
          <label>가격</label>
          <input type="text" className="price" name="price" placeholder="$가격을 입력해주세요." onKeyUp={(e)=>{
            let value = e.target.value;
            const input = document.querySelector('.price')
            value = Number(value.replaceAll(',', ''));
            if(isNaN(value)) {         //NaN인지 판별
              input.value = 0;   
            }else {                   //NaN이 아닌 경우
              const formatValue = value.toLocaleString('ko-KR');
              input.value = formatValue;
            }
          }} />
          <label>자세한 설명</label>
          <textarea type="text" className="content" name="content" placeholder="마켓에 올릴 게시글 내용을 작성해주세요." />
          <input type="text" className="imgUrl" name="imgUrl" defaultValue={srcCopy} style={{display : 'none'}} />
          <button type="submit" className="btn">작성 완료</button>
        </form>
      </div>
        
    </div>

  );
}

export {ImgUpload}