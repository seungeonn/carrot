import { connectDB } from "@/util/database";
import Link from "next/link";
import './style/main.scss';

export default async function Home() {

  const db = (await connectDB).db('carrot')
  let result = await db.collection('post').find().toArray()

  return (
    <div className="main">

      <h2>중고거래를 시작하세요!</h2>
      
      <div className="contents">
        {
          result.map((a,i)=>
            <div className="box" key={i}>
              <Link href={'/detail/' + a._id}>
                <div className="imgBox"><img src={JSON.parse(a.imgUrl)[0]} alt={i} /></div>
                <div className="text">
                  <div className="title">{a.title}</div>
                  <div className="price">{a.price}원</div>
                </div>
              </Link>
            </div>
          )
        }
      </div>

    </div>
  )
}
