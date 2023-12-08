import '../../style/post.scss'
import ImgUpload from './Edit';
import InputPrice from './inputPrice';
import { ObjectId } from 'mongodb';
import { connectDB } from '@/util/database';

export default async function page(props) {

  // let session = await getServerSession(authOptions)

  const db = (await connectDB).db('carrot')
  let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)})
  
  result._id = toString(result._id)
  
  return(

    <ImgUpload result = {result} postId = {props.params.id}></ImgUpload>

    
  )
}