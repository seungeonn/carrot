'use client'

import { useState } from "react";
import '../style/post.scss'

export default function Post() {

  const [src, setSrc] = useState([])
  
  return (
    <div>
      <h2>내 물건 팔기</h2>
      <div className="camera">
        <input className="Upload" type="file" accept="image/*" multiple  onChange={async (e)=>{
          let f = Array.from(e.target.files)
          console.log(f);
        
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
            console.log(upload)
            if (upload.ok) {
              // // setSrc(src.push(upload.url + '/' + filename))
              // const addUrl = [(upload.url + '/' + filename)]
              // const copy = [...src]
              // // const newSrc = [...copy, ...addUrl]
              // copy.push((upload.url + '/' + filename))
              // setSrc(copy)
              // console.log(src);
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
              console.log(src);
              return (
                <div className="box"><img className="img" src={a} alt={i} key={i}/></div>
              )
            })
          }
        </div>
      </div>

      <div className="form">
        <form>
          <label>제목</label>
          <input type="text" className="title" name="title" placeholder="제목" />
          <label>가격</label>
          <input type="number" className="price" name="price" placeholder="$가격을 입력해주세요." />
          <label>자세한 설명</label>
          <input type="text" className="content" name="content" placeholder="마켓에 올릴 게시글 내용을 작성해주세요." />
          <button type="submit" className="btn">작성 완료</button>
        </form>
      </div>
        
    </div>
  );
}