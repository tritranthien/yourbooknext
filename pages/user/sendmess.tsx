import debounce from 'lodash.debounce';
import React, { ChangeEvent, ReactElement, useCallback, useState, useRef, useEffect } from 'react';
import { AiFillCloseCircle, AiOutlineSend, AiOutlineUser, AiOutlineSearch, AiOutlineMessage } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { UserFind } from '../../interface/_User';
import { finByName } from '../../libs/api/authAPI';
import { sendMessage } from '../../libs/api/messAPI';

const Userdata = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [finduser, setFindUser] = useState('');
    const [userList, setUserList] = useState<UserFind[]>([]);
    const [revicerList, setReciver] = useState<UserFind[]>([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const debouncedSave = useCallback(
        debounce(async (nextValue: string) => {
            if (nextValue.length > 0) {
                setSearching(true);
                try {
                    const res = await finByName(nextValue);
                    setUserList([...res]);
                } catch (error) {
                    console.error(error);
                } finally {
                    setSearching(false);
                }
            } else {
                setUserList([]);
            }
        }, 800),
        [],
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setUserList([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePush = (newitem: UserFind) => {
        if (revicerList.some(r => r._id === newitem._id)) {
            toast.warn('Người dùng này đã có trong danh sách');
            return;
        }
        setReciver(pre => [...pre, newitem]);
        setFindUser('');
        setUserList([]);
    }

    const removeThis = (index: number) => {
        const newArr = [...revicerList];
        newArr.splice(index, 1);
        setReciver(newArr);
    }

    const handleInputFindChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFindUser(value);
        debouncedSave(value);
    }

    const handleReset = () => {
        setContent('');
        setTitle('');
        setFindUser('');
        setReciver([]);
        setUserList([]);
    }

    const sendMess = async () => {
        if (revicerList.length === 0) {
            toast.error('Vui lòng chọn người nhận');
            return;
        }
        if (!title.trim() || !content.trim()) {
            toast.error('Vui lòng nhập đầy đủ tiêu đề và nội dung');
            return;
        }

        setLoading(true);
        const newMess = {
            recieverList: revicerList,
            content: content,
            title: title
        }
        try {
            const res = await sendMessage(newMess);
            if (res.status === 200 || res.status === 201) {
                toast.success('Gửi thông điệp thành công!');
                handleReset();
            }
        } catch (error) {
            toast.error('Gửi thất bại, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500">
                    <AiOutlineMessage size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Soạn thông điệp</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gửi lời nhắn đến những người bạn muốn chia sẻ</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                {/* Recipient Section */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <AiOutlineUser className="text-sky-500" /> Người nhận
                    </label>
                    <div className="relative" ref={searchRef}>
                        <div className="relative">
                            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                value={finduser || ''} 
                                onChange={handleInputFindChange} 
                                type="text" 
                                className="w-full h-12 pl-10 pr-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all dark:text-white" 
                                placeholder="Tìm kiếm người dùng qua tên..."
                            />
                            {searching && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="w-4 h-4 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        
                        {(finduser.length > 0 || userList.length > 0) && (
                            <ul className="absolute z-50 top-full mt-2 left-0 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                {finduser.length > 0 && userList.length <= 0 && !searching && (
                                    <li className="px-4 py-3 text-sm text-slate-500 italic">Không tìm thấy người dùng nào</li>
                                )}
                                {userList.map((item, index) => (
                                    <li 
                                        key={index} 
                                        onClick={() => handlePush(item)} 
                                        className="cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-500/10 px-4 py-3 flex items-center gap-3 transition-colors border-b border-slate-50 dark:border-slate-700/50 last:border-0"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                                            {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">{item.username[0].toUpperCase()}</div>}
                                        </div>
                                        <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{item.username}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Selected Recipients */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {revicerList.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 px-3 py-1.5 rounded-lg text-sm font-medium border border-sky-100 dark:border-sky-500/20 group animate-in zoom-in duration-200">
                                <span>{item.username}</span>
                                <button onClick={() => removeThis(index)} className="text-sky-300 hover:text-red-500 transition-colors">
                                    <IoMdClose size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tiêu đề</label>
                    <input 
                        value={title || ''} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                        name="title" 
                        placeholder="Nhập tiêu đề cho thông điệp..." 
                        type="text" 
                        className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all dark:text-white"
                    />
                </div>

                {/* Content Area */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nội dung</label>
                    <textarea 
                        value={content || ''} 
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} 
                        name="content" 
                        placeholder="Bạn muốn nhắn nhủ điều gì..." 
                        className="w-full h-48 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all dark:text-white resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <button 
                        onClick={handleReset} 
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    >
                        Làm mới
                    </button>
                    <button 
                        disabled={loading}
                        onClick={sendMess} 
                        className={`flex items-center gap-2 px-8 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white rounded-xl text-sm font-bold shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <AiOutlineSend />
                                <span>Gửi tin nhắn</span>
                            </>
                        )}
                    </button>
                </div>
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