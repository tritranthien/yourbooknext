import { parseISO,format } from 'date-fns';
import { FC, ReactElement, useState } from 'react'
import React from 'react';
import { useQuery } from 'react-query';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { mySents } from '../../libs/api/messAPI';
import { AiFillCloseSquare } from 'react-icons/ai';

const Userdata = () => {
  const [open,setOpen] = useState(-1);
  const {data,isSuccess,error} = useQuery('myMessSent',mySents)
    return (
        <div className="w-full min-h-screen p-4">
            <span className="font-bold text-2xl">thư đã gửi</span>
            <ul className="w-full mt-4">
              {
                isSuccess && data.map((item,index)=>{
                  return <li onClick={()=>setOpen(index)} key={index} className="cursor-pointer flex text-sm  w-full p-2 border-b-[1px] border-b-gray-300 border-t-[1px] -mt-[1px] border-t-gray-300">
                    <span className="font-bold mr-2">to:</span>
                    <span className="line-clamp-1 w-2/12">
                      {
                        item.reciever.map((item2,index2)=>{
                          return <i key={index2} className="mr-2 text-orange-500">{index2 != 0 && ','}{item2.username}</i>
                        })
                      }
                    </span>
                    <span className="font-bold italic line-clamp-1 px-2 w-3/12">{item.title}</span>
                    <span className="italic px-2 line-clamp-1 w-5/12">{`"${item.content}"`}</span>
                    <span className="w-1/12">{format(parseISO(item.createdAt),'yyyy-MM-dd')}</span>
                  </li>
                })
              }
            </ul>
            {
              open >= 0 && isSuccess && <div className='flex fixed top-0 left-0 w-screen h-screen justify-center items-center'>
                <div className="w-[500px] relative bg-white shadow-md p-4">
                  <AiFillCloseSquare onClick={()=>setOpen(-1)} size={25} color="red" className='absolute top-1 right-1 cursor-pointer'/>
                  <span className="block font-bold mt-2"><b className='mr-2'>gửi đến:</b>
                  {
                    data[open].reciever.map((item,index)=>{
                      return <i key={index} className="text-orange-500">{index != 0 && ','}{item.username}</i>
                    })
                  }
                  </span>
                  <span className="mt-2 block"><b className="mr-2">tiêu đề:</b><i>{data[open].title}</i></span>
                  <span className='font-bold block mt-2'>nội dung: </span>
                  <p className="p-2 text-gray-500 h-[220px] overflow-y-auto">{data[open].content}</p>
                </div>
                  
              </div>
            }
        </div>
    )
}

Userdata.displayName = 'Userdata';

Userdata.getLayout = function getLayout(page: ReactElement) {
    return (
      <USDBlayout>
        {page}
      </USDBlayout>
    )
  }

export default Userdata;