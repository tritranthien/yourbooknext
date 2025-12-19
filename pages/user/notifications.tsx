import Link from 'next/link';
import React, { ReactElement } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useQuery } from 'react-query';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { getNotis, readNoti } from '../../libs/api/authAPI';

const Userdata = () => {
  const { data, isSuccess, error} = useQuery('notification',getNotis,{
    onSuccess: dt=>{
      if (dt.count > 0) {
        turnToReaded();
      }
    }
  });
  const turnToReaded = async () => {
    try {
        const res = await readNoti();
    } catch (error) {
        
    }
}  
  return (
        <div className="w-full min-h-screen p-4">
          <span className="text-2xl font-bold">Thông báo của bạn</span>
            <ul className="p-2">
              {
                isSuccess && data?.notis.map((item,index)=>{
                  if(item.type == 'newmess'){
                    return <Link legacyBehavior key={index} passHref href='/user/messbox'><a><li className={`py-1 px-3 flex ${!item.read && 'bg-gray-200'}`}><IoIosNotificationsOutline size={25}/> bạn có tin nhắn mới từ <b className="px-2">{item.sender}</b></li></a></Link>
                  }
                  return <Link legacyBehavior key={index} passHref href={`/truyen/${item.novel?.slug}/${item.chap}`}><a><li key={index} className={`py-1 px-3 flex ${!item.read && 'bg-gray-200'}`}><IoIosNotificationsOutline size={25}/> truyện <b className="px-2">{item.novel?.title}</b>vừa cập nhật chap mới <b className="px-2">{item.chap}</b></li></a></Link>
                })
              }
            </ul>
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