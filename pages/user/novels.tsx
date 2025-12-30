import React, { ReactElement, useState } from 'react';
import { AiOutlineFileAdd, AiOutlineBook, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { useQuery } from 'react-query';
import Link from 'next/link';
import UserBookCard from '../../components/Card/UserBookCard';
import AddNewChapPopup from '../../components/popup/AddNewChapPopup';
import EditNovelPopup from '../../components/popup/EditNovelPopup';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { SerVerNovel } from '../../interface/_Novel';
import { getAllNovels } from '../../libs/api/novelAPI';

const Userdata = () => {
    const novels = useQuery('allNovels', () => getAllNovels());
    const [novelUpdating, setNovelUpdating] = useState<SerVerNovel | null>(null);
    const [currentNovel, setCurrentNovel] = useState<SerVerNovel | null>(null);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500">
                        <AiOutlineBook size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Truyện của tôi</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Quản lý các tác phẩm bạn đã đăng tải</p>
                    </div>
                </div>
                
                <Link href="/user/addnew" className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 place-self-start md:place-self-auto">
                    <AiOutlinePlusCircle size={18} />
                    <span>Đăng truyện mới</span>
                </Link>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[400px]">
                {novels.isLoading && (
                    <div className="col-span-full p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin"></div>
                        <span className="text-sm font-medium animate-pulse">Đang tải tác phẩm...</span>
                    </div>
                )}

                {novels.isSuccess && novels.data.length <= 0 && (
                    <div className="col-span-full p-20 flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                            <AiOutlineBook size={48} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">Bạn chưa có tác phẩm nào</h3>
                            <p className="text-sm text-slate-400 max-w-[300px] mx-auto">
                                Hãy chia sẻ những câu chuyện thú vị của bạn với mọi người ngay hôm nay!
                            </p>
                        </div>
                        <Link href="/user/addnew" className="mt-2 text-rose-500 font-bold hover:underline">Bắt đầu ngay</Link>
                    </div>
                )}

                {novels.isSuccess && novels.data.map((item, index) => (
                    <div key={index} className="group relative bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 30}ms` }}>
                        <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-2 shadow-sm bg-slate-100 dark:bg-slate-800">
                            <img 
                                src={item.image || '/images/tt.jpg'} 
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[1px]">
                                <button 
                                    onClick={() => setNovelUpdating(item)}
                                    className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-slate-800 hover:text-rose-500 shadow-xl transition-all hover:scale-110 active:scale-95"
                                    title="Chỉnh sửa truyện"
                                >
                                    <MdOutlineEditNote size={22} />
                                </button>
                                <button 
                                    onClick={() => setCurrentNovel(item)}
                                    className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-slate-800 hover:text-sky-500 shadow-xl transition-all hover:scale-110 active:scale-95"
                                    title="Thêm chương mới"
                                >
                                    <AiOutlineFileAdd size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="px-1.5 pb-1.5 space-y-0.5">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-rose-500 transition-colors">{item.title}</h4>
                            <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                <span className="truncate max-w-[60px]">{(item as any).category?.cate || 'Truyện'}</span>
                                <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">{item.status === 'completed' ? 'Xong' : 'Đang ra'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {novelUpdating && (
                <EditNovelPopup 
                    closeUpdate={() => {
                        setNovelUpdating(null);
                        novels.refetch();
                    }} 
                    novel={novelUpdating} 
                />
            )}

            {currentNovel && (
                <AddNewChapPopup 
                    closeChap={() => setCurrentNovel(null)} 
                    novel={currentNovel} 
                />
            )}
        </div>
    );
}

Userdata.displayName = 'Userdata';

Userdata.getLayout = function getLayout(page: ReactElement) {
    return (
        <USDBlayout>
            {page}
        </USDBlayout>
    );
};

export default Userdata;