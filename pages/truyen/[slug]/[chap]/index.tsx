import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FaComment, FaWindowClose } from 'react-icons/fa';
import { IoIosArrowBack, IoIosSettings } from 'react-icons/io'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { SerVerChap } from '../../../../interface/_Chap';
import { getChap } from '../../../../libs/api/novelAPI';

interface SSGProps{
    params:{
        chap:number,
        slug:string
    }
}
interface SSRRES{
    thisChap?: SerVerChap,
    slug: string,
    errorFetch?: boolean
}

const index:React.FC<SSRRES> = ({slug,thisChap,errorFetch}:SSRRES) => {
    const router = useRouter();
    const [show,setShow] = useState<number>(-1);
    if (errorFetch || !thisChap) {
        return <div className="w-full h-[550px] flex flex-col justify-center items-center">
            <span className="text-7xl font-bold">404</span>
            <span className="font-bold text-xl">không có dữ liệu, vui lòng coi lại đường dẫn</span>
        </div>
    }
    return <div className='w-full'>
        
        <div className="container">
        <div className="flex border-b-orange-600-600 justify-between text-blue-500">
            <Link passHref href={`/truyen/${slug}`}><a><span className="flex items-center h-11 font-bold text-gray-900"><IoIosArrowBack />{thisChap.novel.title}</span></a></Link>
        </div>
            <div className="w-full flex flex-col py-5 px-10 ">
                <span className="text-3xl font-bold uppercase">{thisChap.novel.title}</span>
                <span className="text-xl text-blue-500">{`chương ${thisChap.chap}: ${thisChap.title}`}</span>
                <span className="text-xl text-blue-500">{ `Người đăng: Trí trê` }</span>
                <span className="text-xl text-blue-500">đăng lúc: 20/02/2022 </span>
            </div>
            <span className=' flex px-10'>
                <button 
                disabled={thisChap.chap <= 1} 
                onClick={()=>{ router.push(`/truyen/${slug}/${thisChap.chap - 1}`)}} 
                className="flex justify-center items-center w-8 h-8 leading-8 text-center cursor-pointer bg-blue-700 text-white rounded-sm disabled:opacity-70">
                    <MdArrowBackIosNew />
                </button>

                <button 
                disabled={ thisChap.chap == thisChap.novel.chapCount}
                onClick={()=>{ router.push(`/truyen/${slug}/${thisChap.chap + 1}`)}}
                className="flex justify-center items-center ml-2 w-8 h-8 leading-8 text-center cursor-pointer bg-blue-700 text-white rounded-sm disabled:opacity-70">
                    <MdArrowForwardIos />
                </button>
                
                
            </span>
            <p className='w-full py-5 px-10 whitespace-pre-wrap'>
                { thisChap.content }
            </p>
        </div>
        <div className="w-[40px] fixed left-0 top-1/2 translate-y-[-50%] cursor-pointer">
            <span onClick={()=>setShow(0)} className="flex justify-center items-center w-[40px] h-[40px] text-xl opacity-70"><AiOutlineUnorderedList/></span>
            <span className="flex justify-center items-center w-[40px] h-[40px] text-xl opacity-70"><IoIosSettings/></span>
            <span className="flex justify-center items-center w-[40px] h-[40px] text-xl opacity-70"><FaComment/></span>
        </div>
        { show == 0 &&<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center">
            <div className="relative w-[700px] h-[400px] bg-white px-10">
                <span className="w-full font-bold py-5 block text-xl">Danh sách chương</span>
                <span onClick={()=>setShow(-1)} className="absolute top-1 right-1 w-[50px] h-[50px] block text-[30px] cursor-pointer"><FaWindowClose/></span>
                <ul className='flex flex-wrap'>
                    <li className='w-1/2'>Chương 1: Thiên địa lực lượng</li>
                    <li className='w-1/2'>Chương 2: Thiên địa lực lượng</li>
                    <li className='w-1/2'>Chương 3: Thiên địa lực lượng</li>
                    <li className='w-1/2'>Chương 4: Thiên địa lực lượng</li>
                    <li className='w-1/2'>Chương 5: Thiên địa lực lượng</li>
                    <li className='w-1/2'>Chương 6: Thiên địa lực lượng</li>
           
                </ul>
            </div>
            
        </div>}

        
  </div>;
};

export const getServerSideProps = async ({params}: SSGProps) => {
    const { slug,chap } = params;
    const thisChap = await getChap(slug,chap);
    if (!thisChap._id) {
        return {
            props:{
                errorFetch: true
            }
        }
    }
    return {
        props:{
            slug,
            thisChap
        }
    }
}

export default index;
