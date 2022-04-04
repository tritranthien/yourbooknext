import type { FC, ReactElement } from 'react'
import React from 'react';
import UserBookCard from '../../components/Card/UserBookCard';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { useGetFollowed } from '../../customHooks/reactQuery/followed';

const Userdata = () => {
  const { data,isSuccess,error } = useGetFollowed();
    return (
      <div className="w-full min-h-screen z-40">
          <span className="block px-5 py-3 text-2xl font-bold">Truyện đang theo dõi</span>
        <div className="w-full flex flex-wrap gap-4 p-5 min-h-screen">
          {
            isSuccess && data.length <= 0 && <p className='p-2'><i>Bạn chưa theo dõi chuyện nào cả</i></p>
          }
            {
              isSuccess && data.map((item,index)=>{
                return <div key={index} className="group w-[220px] h-[350px] relative">
                  <UserBookCard key={index} novel={item.novel}/>
                </div>
                
              })
            }
            </div>
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