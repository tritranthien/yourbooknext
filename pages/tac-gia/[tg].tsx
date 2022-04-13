import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import VerticalCard from '../../components/Card/VerticalCard'
import { useAuthorNovels } from '../../customHooks/reactQuery/Novelofauthor'
import { Author } from '../../interface/_Author'
import { findBySlug } from '../../libs/api/authorAPI'
interface SSRContext{
  params : {
    tg: string,
  }
}
interface AuthorpageProps{
  author: Author,
}
const Authorpage:React.FC<AuthorpageProps> = ({author}:AuthorpageProps) => {
    const { data, isSuccess, error } = useAuthorNovels(author._id);
 
  return (
    <div className="w-full">
      <div className="container">
        
        <div className="flex mt-10">
          <div className="w-1/4">
          <span className="block  text-white text-2xl uppercase px-3 py-1 bg-stone-900">tác giả: <b className="text-orange-500">{author.name}</b></span>
            <div className="w-full relative h-[250px]">
              <Image src={author.image} objectFit='cover' layout="fill" alt={author.slug}/>
            </div>
            <div className="px-3 py-1">
              <span className="text-orange-700 block"><b>số truyện: </b>{author.novelCount}</span>
              <span className="block"><b>năm sinh:</b> {author.birth ? format(parseISO(author.birth),'yyyy-MM-dd') : '???'}</span>
              <p className=""><b>mô tả: </b>{author.des && author.des != '' ? author.des : '???'}</p>
            </div>
          </div>
          <div className="w-3/4">
            <span className="w-full block px-3 py-1 text-2xl">Truyện của tác giả: <b className="text-orange-500">{author.name} </b></span>
            {
              isSuccess && data.map((item,index)=>{
                return <VerticalCard key={index} novel={item}/>
              })
            }
          </div>
        </div>
    </div>
    </div>
    
  )
}
export const getServerSideProps = async ({params}:SSRContext)=>{
  const { tg } = params;
    const author = await findBySlug(tg);
    if(author){
      return {
        props: {
          author
        }
      }
    }
    return {
      redirect: {
        permanent: false,
        destination: "/page404",
      },
      props:{},
    } 
   
  
}
export default Authorpage