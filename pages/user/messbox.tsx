import { format, parseISO } from 'date-fns';
import React, { ReactElement, useState } from 'react';
import { AiOutlineMail, AiOutlineClockCircle, AiOutlineUser, AiOutlineMessage, AiOutlineInbox } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { useQuery } from 'react-query';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { myRecievers } from '../../libs/api/messAPI';

const Userdata = () => {
    const [openIndex, setOpenIndex] = useState(-1);
    const { data, isSuccess, isLoading } = useQuery('allMyRecievedMess', myRecievers);

    const openMessage = (index: number) => {
        setOpenIndex(index);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                        <AiOutlineInbox size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Thư đến</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Quản lý các tin nhắn bạn đã nhận</p>
                    </div>
                </div>
                <div className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg uppercase tracking-wider">
                    {data?.length || 0} Tin nhắn
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <div className="col-span-3">Người gửi</div>
                    <div className="col-span-8">Nội dung</div>
                    <div className="col-span-1 text-right">Ngày</div>
                </div>

                <ul className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {isLoading && (
                        <div className="p-12 flex flex-col items-center justify-center gap-4 text-slate-400">
                            <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                            <span className="text-sm font-medium animate-pulse">Đang tải hộp thư...</span>
                        </div>
                    )}

                    {isSuccess && data?.length === 0 && (
                        <div className="p-20 flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                <AiOutlineMail size={40} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Hộp thư trống</h3>
                                <p className="text-sm text-slate-400 max-w-[240px] mt-1">Bạn chưa nhận được bất kỳ tin nhắn nào tại đây.</p>
                            </div>
                        </div>
                    )}

                    {isSuccess && data?.map((item, index) => (
                        <li 
                            key={index}
                            onClick={() => openMessage(index)} 
                            className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-sky-500/5 transition-all relative"
                        >
                             <div className="grid grid-cols-12 gap-3 px-4 py-3 items-center">
                                <div className="col-span-12 md:col-span-3 flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                        {item.sender.image ? <img src={item.sender.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">{item.sender.username[0]}</div>}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 line-clamp-1">{item.sender.username}</span>
                                        <span className="md:hidden text-[9px] text-slate-400">{format(parseISO(item.createdAt), 'dd/MM/yyyy')}</span>
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-8 flex flex-col">
                                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                                        {item.content}
                                    </span>
                                </div>

                                <div className="hidden md:block col-span-1 text-right">
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                                        {format(parseISO(item.createdAt), 'dd/MM')}
                                    </span>
                                </div>
                             </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Message Modal */}
            {openIndex >= 0 && isSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300">
                    <div 
                        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner flex-shrink-0">
                                        {data[openIndex].sender.image ? <img src={data[openIndex].sender.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl text-slate-400 font-bold uppercase">{data[openIndex].sender.username[0]}</div>}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Người gửi</h4>
                                        <p className="font-bold text-xl text-slate-800 dark:text-white leading-none">{data[openIndex].sender.username}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setOpenIndex(-1)}
                                    className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <IoMdClose size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/50">
                                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                        <AiOutlineMessage /> Tiêu đề thông điệp
                                    </h5>
                                    <p className="font-bold text-slate-700 dark:text-slate-200">{data[openIndex].title}</p>
                                </div>

                                <div className="space-y-2">
                                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 px-1">
                                         Nội dung
                                    </h5>
                                    <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 min-h-[160px] max-h-[300px] overflow-y-auto text-slate-600 dark:text-slate-300 leading-relaxed custom-scrollbar">
                                        {data[openIndex].content}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <AiOutlineClockCircle />
                                    <span>{format(parseISO(data[openIndex].createdAt), 'HH:mm - dd/MM/yyyy')}</span>
                                </div>
                                <button 
                                    onClick={() => setOpenIndex(-1)}
                                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-sm font-bold transition-transform active:scale-95 shadow-xl shadow-slate-900/10 dark:shadow-none"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Userdata.displayName = 'Userdata';

Userdata.getLayout = function getLayout(page: ReactElement) {
    return (
        <USDBlayout>
            {page}
        </USDBlayout>
    );
};

export default Userdata;