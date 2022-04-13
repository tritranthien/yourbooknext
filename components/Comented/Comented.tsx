import Link from 'next/link';
import React from 'react'
import { BsFillSdCardFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { getCmted, getVoted } from '../../libs/api/authAPI';

const Comented = () => {
  const {data,isSuccess,error} = useQuery('myComented',getCmted);

  return (
    <div className="w-full p-5">
                      <span className="font-bold text-xl">đã bình luận</span>
                      <ul className="p-5">
                     
                        {
                          isSuccess && data.map((item,index)=>{
                            return <li key={index} className="flex py-1">
                              <span className="px-3 font-bold line-clamp-1"><Link passHref href={`/truyen/${item.novel.slug}`}><a className="text-sky-500">{item.novel.title}</a></Link></span>
                              <span className="px-3 line-clamp-1"><i>{`"${item.content}"`}</i></span>
                            </li>
                          })
                        }
                      </ul>
                    </div>
  )
}

export default Comented