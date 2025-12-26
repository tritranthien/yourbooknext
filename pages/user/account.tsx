import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Comented from '../../components/Comented/Comented';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import Voted from '../../components/voted/Voted';
import { getMyInfo, updateProfile } from '../../libs/api/authAPI';
import { upLoadPoster } from '../../libs/api/uploadFile';
import { toast } from 'react-toastify';
import PosterPopup from '../../components/popup/PostersPopup';

const Userdata = () => {
  const [active,setActive] = useState(true);
  const info = useQuery('myAccountInfo',getMyInfo);
  const queryClient = useQueryClient();
  
  const [activeEdit, setActiveEdit] = useState(false);
  const [openLibrary, setOpenLibrary] = useState(false);
  const [editData, setEditData] = useState({
      email: '',
      image: ''
  });

  useEffect(() => {
      if (info.data) {
          setEditData({
              email: info.data.email || '',
              image: info.data.image || ''
          });
      }
  }, [info.data]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || !e.target.files[0]) return;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('poster', file);
      const toastId = toast.loading("Đang tải ảnh lên...");
      try {
          const res = await upLoadPoster(formData);
          if (res.secure_url) {
              setEditData(prev => ({ ...prev, image: res.secure_url }));
              toast.update(toastId, { render: "Tải ảnh thành công", type: "success", isLoading: false, autoClose: 2000 });
          }
      } catch (error) {
          toast.update(toastId, { render: "Lỗi tải ảnh", type: "error", isLoading: false, autoClose: 2000 });
      }
  };

  const updateMutation = useMutation(updateProfile, {
      onSuccess: () => {
          toast.success("Cập nhật thông tin thành công");
          setActiveEdit(false);
          queryClient.invalidateQueries('myAccountInfo');
      },
      onError: () => {
          toast.error("Lỗi khi cập nhật thông tin");
      }
  });

  const handleSave = () => {
      updateMutation.mutate(editData);
  };

    return (
        <div className="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/20 p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
               <div>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Thông tin cá nhân</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Quản lý tài khoản và các hoạt động của bạn</p>
               </div>
              {!activeEdit ? (
                <button 
                  onClick={() => setActiveEdit(true)}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-95 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  Chỉnh sửa
                </button>
              ) : (
                 <div className="flex gap-3">
                    <button 
                      onClick={() => setActiveEdit(false)}
                      className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                    >
                      Hủy
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all active:scale-95"
                    >
                      Lưu thay đổi
                    </button>
                 </div>
              )}
            </div>

            <div className="w-full">
              {info.isSuccess && (
                !activeEdit ? (
                  <div className="space-y-8">
                     <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800/50 shadow-sm flex flex-col md:flex-row gap-10 items-center md:items-start group transition-all hover:border-primary-500/20">
                        <div className="relative shrink-0">
                           <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                           <Image src={info.data.image} alt={info.data.username} width={180} height={180} objectFit="cover" className="rounded-3xl shadow-xl border-4 border-white dark:border-slate-800 relative z-10" />
                        </div>
                        
                        <div className="flex-1 w-full flex flex-col items-center md:items-start">
                           <div className="mb-6 text-center md:text-left">
                              <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">Member</span>
                              <h2 className='text-3xl font-black text-slate-800 dark:text-white'>{info.data.username}</h2>
                              <p className="text-slate-400 dark:text-slate-500 font-medium">{info.data.email}</p>
                           </div>

                           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                              {[
                                { label: 'Truyện đăng', value: info.data.posted, color: 'text-blue-500', link: '/user/novels' },
                                { label: 'Theo dõi', value: info.data.followed, color: 'text-indigo-500', link: '/user/inschap' },
                                { label: 'Chương đăng', value: info.data.chapCount, color: 'text-emerald-500', link: '/user/novels' },
                                { label: 'Kim phiếu', value: info.data.goldcard, color: 'text-yellow-500', link: '#' },
                              ].map((stat, idx) => (
                                <Link key={idx} legacyBehavior passHref href={stat.link}>
                                  <a className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all group/card shadow-sm hover:shadow-md">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</span>
                                    <span className={`text-xl font-black ${stat.color} group-hover/card:scale-110 transition-transform inline-block`}>{stat.value}</span>
                                  </a>
                                </Link>
                              ))}
                           </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex p-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl w-fit">
                        <button 
                          onClick={()=>setActive(true)} 
                          className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${active ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-slate-950/50' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                        >
                          Lịch sử đề cử
                        </button>
                        <button 
                          onClick={()=>setActive(false)} 
                          className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${!active ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-slate-950/50' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                        >
                          Bình luận gần đây
                        </button>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800/50 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        {active ? <Voted/> : <Comented/>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-10 animate-in zoom-in-95 duration-500">
                      <div className="flex flex-col items-center gap-6">
                          <div className="relative group">
                              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-inner">
                                  <Image src={editData.image || info.data.image} alt="Avatar" width={160} height={160} unoptimized className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                              </div>
                              <button 
                                onClick={() => setOpenLibrary(true)}
                                className="absolute bottom-[-10px] right-[-10px] w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-90 border-2 border-white dark:border-slate-900"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                              </button>
                          </div>
                          
                          <div className="flex gap-3">
                               <button type="button" onClick={() => setOpenLibrary(true)} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Thư viện ảnh</button>
                               <label className="px-5 py-2.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-bold rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 cursor-pointer transition-all">
                                  Tải ảnh mới
                                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                               </label>
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên hiển thị</label>
                              <div className="relative">
                                <input type="text" value={info.data.username} disabled className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 cursor-not-allowed font-medium shadow-inner" />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md text-[8px] font-black uppercase text-slate-500 dark:text-slate-400">Lock</div>
                              </div>
                              <p className="text-[10px] text-slate-400 italic ml-1">Tên đăng nhập không thể thay đổi để bảo vệ tài khoản</p>
                          </div>

                          <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ Email</label>
                              <input 
                                  type="email" 
                                  value={editData.email} 
                                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 outline-none transition-all font-medium shadow-inner"
                                  placeholder="your@email.com"
                              />
                          </div>
                      </div>
                  </div>
                )
              )}
            </div>
            
            {openLibrary && (
                <PosterPopup 
                    choonseImage={(url) => {
                        setEditData({...editData, image: url});
                        setOpenLibrary(false);
                    }} 
                    closePopup={() => setOpenLibrary(false)} 
                />
            )}
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