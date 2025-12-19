import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import Comented from '../../components/Comented/Comented';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import Voted from '../../components/voted/Voted';
import { getMyInfo } from '../../libs/api/authAPI';

const Userdata = () => {
  const [active,setActive] = useState(true);
  const info = useQuery('myAccountInfo',getMyInfo);
    return (
        <div className="w-full min-h-screen">
            <span className="w-full block px-5 py-3 text-2xl font-bold">Thông tin người dùng</span>
            <div className="flex w-full px-5 py-2 flex-col">
              
                {
                  info.isSuccess && <><div className="w-full flex flex-col md:flex-row md:p-5">
                      <Image src={info.data.image} alt={info.data.image} width={180} height={180} objectFit="cover" />
                      <div className="w-full md:w-[calc(100%_-_180px)]">
                      <span className='p-2 w-full font-bold text-xl text-sky-500 block md:pl-5'>{info.data.username}</span>
                        <ul className="w-full px-2 md:px-7">
                        <li className="flex items-center text-lg"><b className="w-[200px]">số truyện đã đăng:</b><Link legacyBehavior passHref href={`/user/novels`}><a className="text-sky-500">{info.data.posted}</a></Link></li>
                        <li className="flex items-center text-lg mt-2"><b className="w-[200px]">số truyện theo dõi:</b><Link legacyBehavior passHref href={`/user/inschap`}><a className="text-sky-500">{info.data.followed}</a></Link></li>
                        <li className="flex items-center text-lg mt-2"><b className="w-[200px]">số chương đã đăng:</b><Link legacyBehavior passHref href={`/user/novels`}><a className="text-sky-500">{info.data.chapCount}</a></Link></li>
                        <li className="flex items-center text-lg mt-2"><b className="w-[200px]">số kim phiếu còn:</b><span className="text-yellow-600">{info.data.goldcard}</span></li>
                        </ul>
                      </div>
                  </div>
                  <div className="flex mt-5 px-2 md:px-5">
                    <span onClick={()=>setActive(true)} className={`hover:cursor-pointer block rounded-md px-3 py-1 mr-2 ${active && 'bg-orange-500 text-white'}`}>đã đề cử</span>
                    <span onClick={()=>setActive(false)} className={`hover:cursor-pointer block rounded-md px-3 py-1 ${!active && 'bg-orange-500 text-white'}`}>đã bình luận</span>
                  </div>
                  <div className="">
                    {
                      active ? <Voted/> : <Comented/>
                    }
                  </div>
                  </>
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