import { getServerSession } from 'next-auth';
import '../style/post.scss'
import ImgUpload from './ImgUpload';
import Login from '../Login';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Post() {

  let session = await getServerSession(authOptions)
  
  return(
    session ? <ImgUpload session={session}></ImgUpload> : <Login></Login>
  )
}