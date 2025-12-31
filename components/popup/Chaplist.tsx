import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { FaWindowClose } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getChapsNoLimit } from '../../libs/api/novelAPI'
interface ChapProps{
    novel:string,
    slug:string,
    closePopup: () => void
}
const Chaplist:React.FC<ChapProps> = ({closePopup,novel,slug}:ChapProps) => {
    const {data,error,isSuccess, isLoading} = useQuery(['allChapTitle',novel],()=>getChapsNoLimit(novel));
    const router = useRouter();
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <AiOutlineUnorderedList className="text-2xl text-primary-500" />
                        Danh sách chương
                    </h2>
                    <button 
                        onClick={closePopup} 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <FaWindowClose className="text-2xl" />
                    </button>
                </div>

                <div className="px-4 py-4 h-[500px] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full opacity-40">
                            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-sm font-medium">Đang tải danh sách...</p>
                        </div>
                    ) : data && data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {data.map((item, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => {
                                        closePopup();
                                        router.push(`/truyen/${slug}/${item.chap}`);
                                    }} 
                                    className="group p-4 rounded-xl hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-all cursor-pointer flex items-center gap-4"
                                >
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-primary-500 group-hover:text-white text-xs font-bold transition-colors">
                                        {item.chap}
                                    </span>
                                    <span className="text-gray-700 group-hover:text-primary-900 font-reading-lora text-sm line-clamp-1 transition-colors">
                                        {item.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full opacity-40">
                            <AiOutlineUnorderedList className="text-5xl mb-4" />
                            <p className="text-sm font-medium">Chưa có chương nào được đăng</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chaplist