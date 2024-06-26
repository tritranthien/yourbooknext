import { format, parseISO } from 'date-fns';
import React, { ReactElement, useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { useQuery } from 'react-query';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { myRecievers } from '../../libs/api/messAPI';

const Userdata = () => {
  const [open,setOpen] = useState(-1);
  const { data, isSuccess, error} = useQuery('allMyRecievedMess',myRecievers);
    return (
        <div className="w-full min-h-screen p-4">
            <span className="font-bold text-2xl">thư tới</span>
            <ul className="w-full mt-4">
              {
                data && data.length <= 0 && <li className="py-1 px-3"><i>bạn chưa theo dõi truyện nào</i></li>
              }
              {
                isSuccess && data?.map((item,index)=>{
                  return <li onClick={()=>setOpen(index)} key={index} className="cursor-pointer flex text-sm  w-full p-2 border-b-[1px] border-b-gray-300 border-t-[1px] -mt-[1px] border-t-gray-300">
                    <span className="font-bold mr-2">from:</span>
                    <span className="line-clamp-1 w-2/12">
                    <i className="mr-2 text-orange-500">{item.sender.username}</i>
                    </span>
                    <span className="font-bold italic line-clamp-1 px-2 w-10/12 md:w-3/12">{item.title}</span>
                    <span className="italic px-2 md:line-clamp-1 md:w-5/12 hidden md:block">{`"${item.content}"`}</span>
                    <span className="w-1/12 hidden md:block">{format(parseISO(item.createdAt),'yyyy-MM-dd')}</span>
                  </li>
                })
              }
            </ul>
            {
              open >= 0 && isSuccess && <div className='flex fixed top-0 left-0 w-screen h-screen justify-center items-center'>
                <div className="w-11/12 md:w-[500px] relative bg-white shadow-md p-4">
                  <AiFillCloseSquare onClick={()=>setOpen(-1)} size={25} color="red" className='absolute top-1 right-1 cursor-pointer'/>
                  <span className="block font-bold mt-2"><b className='mr-2'>người gửi:</b>
                  <i className="text-orange-500">{data && data[open].sender.username}</i>
                  </span>
                  <span className="mt-2 block"><b className="mr-2">tiêu đề:</b><i>{data && data[open].title}</i></span>
                  <span className='font-bold block mt-2'>nội dung: </span>
                  <p className="p-2 text-gray-500 h-[220px] overflow-y-auto">{data && data[open].content}</p>
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