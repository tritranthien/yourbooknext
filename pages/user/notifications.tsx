import Link from 'next/link';
import React, { ReactElement } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useQuery } from 'react-query';
import { format, parseISO } from 'date-fns';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { getNotis, readNoti } from '../../libs/api/authAPI';

const Userdata = () => {
  const { data, isSuccess, error} = useQuery('notification',getNotis,{
    onSuccess: dt=>{
      if (dt.notis.some((n: any) => !n.read)) {
        turnToReaded();
      }
    }
  });

  const turnToReaded = async () => {
    try {
        await readNoti();
    } catch (error) {}
  }  

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/20 py-8 md:py-12 animate-in fade-in duration-700">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">Thông báo của bạn</h1>
          </div>
          {isSuccess && data?.count > 0 && (
             <span className="bg-primary-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{data.count} Mới</span>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-sm overflow-hidden">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {isSuccess && data?.notis.map((item, index) => {
              const isNewMess = item.type === 'newmess';
              const href = isNewMess ? '/user/messbox' : `/truyen/${item.novel?.slug}/${item.chap}`;
              
              return (
                <li key={item._id || index} className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!item.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}>
                  <Link legacyBehavior passHref href={href}>
                    <a className="flex items-center gap-4 p-5 md:px-8 group">
                      <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${!item.read ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                        <IoIosNotificationsOutline size={24} className={!item.read ? 'animate-bounce' : ''}/>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                          {isNewMess ? (
                            <>
                              Bạn có tin nhắn mới từ <span className="font-bold text-slate-900 dark:text-white">{item.sender?.username || 'Người dùng'}</span>
                            </>
                          ) : (
                            <>
                              Truyện <span className="font-bold text-slate-900 dark:text-white">{item.novel?.title}</span> vừa cập nhật <span className="text-primary-600 dark:text-primary-400 font-bold">Chương {item.chap}</span>
                            </>
                          )}
                        </p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                          {item.createdAt ? format(parseISO(item.createdAt), 'HH:mm - dd/MM/yyyy') : 'Vừa xong'}
                        </span>
                      </div>

                      {!item.read && (
                        <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      )}
                    </a>
                  </Link>
                </li>
              );
            })}
            {isSuccess && data?.notis.length === 0 && (
              <div className="py-20 text-center">
                 <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoIosNotificationsOutline size={32} className="text-slate-300 dark:text-slate-600"/>
                 </div>
                 <p className="text-slate-400 dark:text-slate-600 italic font-medium">Hộp thư thông báo của bạn đang trống.</p>
              </div>
            )}
          </ul>
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