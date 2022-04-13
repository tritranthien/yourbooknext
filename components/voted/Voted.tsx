import Link from 'next/link';
import React from 'react'
import { BsFillSdCardFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { getVoted } from '../../libs/api/authAPI';

const Voted = () => {
  const {data,isSuccess,error} = useQuery('myVoted',getVoted);

  return (
    <div className="w-full p-5">
                      <span className="font-bold text-xl">đã đề cử</span>
                      <ul className="p-5">
                     
                        {
                          isSuccess && data.map((item,index)=>{
                            return <li key={index} className="flex py-1">
                              <span className="px-3 flex items-center">x{item.goldcard}<BsFillSdCardFill color='orange' size={15}/></span>
                              <span className="px-3 font-bold line-clamp-1"><Link passHref href={`/truyen/${item.novel.slug}`}><a className="text-sky-500">{item.novel.title}</a></Link></span>
                              <span className="px-3 line-clamp-1"><i>{`"${item.content}"`}</i></span>
                            </li>
                          })
                        }
                      </ul>
                    </div>
  )
}

export default Voted