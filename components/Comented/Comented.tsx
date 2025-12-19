import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { getCmted } from '../../libs/api/authAPI';

const Comented = () => {
  const {data,isSuccess,error} = useQuery('myComented',getCmted);

  return (
    <div className="w-full mt-5 md:p-5">
                      <span className="font-bold text-xl p-3">đã bình luận</span>
                      <ul className="md:p-5">
                     
                        {
                          isSuccess && data?.map((item,index)=>{
                            return <li key={index} className="flex py-1">
                              <span className="px-2 font-bold md:w-auto w-1/2 line-clamp-1"><Link legacyBehavior passHref href={`/truyen/${item.novel.slug}`}><a className="text-sky-500">{item.novel.title}</a></Link></span>
                              <span className="px-2 w-1/2 md:w-auto line-clamp-1"><i>{`"${item.content}"`}</i></span>
                            </li>
                          })
                        }
                      </ul>
                    </div>
  )
}

export default Comented