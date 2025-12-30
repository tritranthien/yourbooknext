import type { ReactElement } from 'react';
import React from 'react';
import { AiOutlineHeart, AiOutlineCompass } from 'react-icons/ai';
import Link from 'next/link';
import UserBookCard from '../../components/Card/UserBookCard';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { useGetFollowed } from '../../customHooks/reactQuery/Followed';

const Userdata = () => {
    const { data, isSuccess, isLoading } = useGetFollowed();

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                    <AiOutlineHeart size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">Truyện đang theo dõi</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Danh sách các tác phẩm bạn đang quan tâm</p>
                </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[400px]">
                {isLoading && (
                    <div className="col-span-full p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                        <span className="text-sm font-medium animate-pulse">Đang tải danh sách theo dõi...</span>
                    </div>
                )}

                {isSuccess && (!data || data.length <= 0) && (
                    <div className="col-span-full p-20 flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                            <AiOutlineHeart size={48} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">Bạn chưa theo dõi truyện nào</h3>
                            <p className="text-sm text-slate-400 max-w-[300px] mx-auto">
                                Khám phá thư viện để tìm kiếm những tác phẩm thú vị và nhấn Thêm vào thư viện nhé!
                            </p>
                        </div>
                        <Link href="/" className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all">
                            <AiOutlineCompass size={18} />
                            <span>Khám phá ngay</span>
                        </Link>
                    </div>
                )}

                {isSuccess && data?.map((item, index) => (
                    <div key={index} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 30}ms` }}>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-2 shadow-sm bg-slate-100 dark:bg-slate-800">
                                <img 
                                    src={item.novel.image || '/images/tt.jpg'} 
                                    alt={item.novel.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <Link 
                                    href={`/truyen/${item.novel.slug}`}
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]"
                                >
                                    <span className="px-4 py-2 bg-white text-slate-900 rounded-xl text-[10px] font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                                        Đọc tiếp
                                    </span>
                                </Link>
                            </div>

                            <div className="px-1.5 pb-1.5 space-y-0.5">
                                <Link href={`/truyen/${item.novel.slug}`}>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors cursor-pointer">{item.novel.title}</h4>
                                </Link>
                                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    <span className="truncate max-w-[60px]">{(item.novel as any).category?.cate || 'Truyện'}</span>
                                    <div className="flex items-center gap-1">
                                        <div className={`w-1 h-1 rounded-full ${item.novel.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                        <span>{item.novel.status === 'completed' ? 'Xong' : 'Ra'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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