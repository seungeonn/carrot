'use client'

import { useEffect, useState } from "react";

export default function ImgUpload({result, postId}) {

  const [src, setSrc] = useState([])

  let srcCopy
  let originCopy 
  let [originUrl, setOriginUrl] = useState(JSON.parse(result.imgUrl))
  

  
  useEffect(()=>{
    srcCopy = document.querySelector('.imgUrl').value = JSON.stringify(src)
  },[src])


  useEffect(()=>{
    setOriginUrl(JSON.parse(result.imgUrl))
    originCopy = document.querySelector('.imgUrl').value = JSON.stringify(originUrl)
  },[])
  
  return (
    <div className="post">
      <h2>내 물건 팔기</h2>
      
      <div className="camera">
        <input className="Upload" type="file" accept="image/*" multiple  onChange={async (e)=>{
          setOriginUrl(null)
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
          { originUrl ?
            originUrl.map((a,i)=>{
              return (
                <div className="box" key={i}><img className="img" src={a} alt={i} key={i}/></div>
              )
            })
            :null
          }
        </div>
      </div>
      
      <div className="form">
        <form method="POST" action="/api/post/edit">
          <label>제목</label>
          <input type="text" className="title" name="title" defaultValue={result.title} placeholder="제목" />
          <label>가격</label>
          <input type="text" className="price" name="price" placeholder="$가격을 입력해주세요." defaultValue={result.price} onKeyUp={(e)=>{
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
          <textarea type="text" className="content" name="content" defaultValue={result.content} placeholder="마켓에 올릴 게시글 내용을 작성해주세요." />
          <input type="text" className="imgUrl" name="imgUrl" defaultValue={originUrl ? originCopy : srcCopy} style={{display : 'none'}} />
          <input type="text" className="postId" name="postId" defaultValue={postId} style={{display : 'none'}} />
          <button type="submit" className="btn">수정 완료</button>
        </form>
      </div>
        
    </div>

  );
}

export {ImgUpload}