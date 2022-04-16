import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getChapsNoLimit } from '../../libs/api/novelAPI'
interface ChapProps{
    novel:string,
    slug:string,
    closePopup: () => void
}
const Chaplist:React.FC<ChapProps> = ({closePopup,novel,slug}:ChapProps) => {
    const {data,error,isSuccess} = useQuery(['allChapTitle',novel],()=>getChapsNoLimit(novel));
    const router = useRouter();
    return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center text-black">
            <div className="relative w-full md:w-[700px] h-5/6 md:h-[400px] bg-white ">
                <span className="w-full font-bold py-5 block text-xl px-10">Danh sách chương</span>
                <span onClick={closePopup} className="absolute top-1 right-1 block text-[30px] cursor-pointer"><FaWindowClose/></span>
                <ul className='flex flex-wrap h-[calc(100%_-_100px)] md:h-[300px] px-10 overflow-y-auto'>
                    {
                        isSuccess && data?.map((item,index)=>{
                            return <li key={index} onClick={()=>{
                                closePopup();
                                router.push(`/truyen/${slug}/${item.chap}`);
                            }} className='w-full md:w-1/2 cursor-pointer'>{`Chương: ${item.chap} - ${item.title}`}</li>
                        })
                    }
                </ul>
            </div>
            
        </div>
  )
}

export default Chaplist