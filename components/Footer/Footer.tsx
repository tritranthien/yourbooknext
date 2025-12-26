import React from 'react';
import {FaDiscord, FaFacebook, FaTwitter, FaYoutube} from 'react-icons/fa'
const Footer: React.FC = () => {
  return <div className='w-full border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300'>
      <ul className="mx-auto flex-wrap p-2 flex justify-center items-center w-full md:h-16 border-b border-slate-100 dark:border-slate-800 list-none text-sm text-slate-500 dark:text-slate-400">
          <li className='px-4 py-2 hover:text-primary-500 cursor-pointer transition-colors'>Giới thiệu</li>
          <li className='px-4 py-2 hover:text-primary-500 cursor-pointer transition-colors'>Quy định chung</li>
          <li className='px-4 py-2 hover:text-primary-500 cursor-pointer transition-colors'>Liên hệ</li>
          <li className='px-4 py-2 hover:text-primary-500 cursor-pointer transition-colors'>Bản quyền</li>
          <li className='px-4 py-2 hover:text-primary-500 cursor-pointer transition-colors'>Báo lỗi</li>
      </ul>
      <div className="mx-auto container flex flex-col md:flex-row py-12 px-6">
        <div className="md:basis-4/12 flex flex-col pr-8">
            <span className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">YourBooks</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm italic">
                Nơi bạn có thể đọc truyện yêu thích với chuyện chữ, truyện tranh và audio truyện, bạn có thể tự do đăng tải những tác phẩm của chính mình, hoặc bản dịch của nhóm. Hãy đăng ký tài khoản ngay hôm nay.
            </p>
            <div className="flex mt-8 gap-4">
                <button className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-95">Đăng nhập</button>
                <button className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">Đăng ký</button>
            </div>
        </div>
        <div className="md:basis-8/12 flex flex-col mt-12 md:mt-0">
            <div className="mb-8">
                <span className="text-slate-900 dark:text-slate-100 font-bold mb-4 block uppercase tracking-wider text-xs">Loại truyện</span>
                <ul className='flex gap-8 list-none text-slate-600 dark:text-slate-400 text-sm'>
                    <li className='hover:text-primary-500 cursor-pointer transition-colors font-medium'>Truyện chữ</li>
                    <li className='hover:text-primary-500 cursor-pointer transition-colors font-medium'>Truyện tranh</li>
                    <li className='hover:text-primary-500 cursor-pointer transition-colors font-medium'>Truyện audio</li>
                </ul>

            </div>
            <div>
                <span className="text-slate-900 dark:text-slate-100 font-bold mb-4 block uppercase tracking-wider text-xs">Thể loại phổ biến</span>
                <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3 list-none text-slate-500 dark:text-slate-500 text-sm'>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện tiên hiệp</li>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện huyền huyễn</li>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện ngôn tình</li>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện linh dị</li>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện trinh thám</li>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện đô thị</li>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện đam mỹ</li>
                    <li className="hover:text-primary-500 cursor-pointer transition-colors">Truyện võng du</li>
                </ul>
            </div>
        </div>
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800/50 py-8 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <p className='font-bold text-slate-400 dark:text-slate-600 text-[11px] uppercase tracking-[0.2em]'>
                    © 2024 YourBooks • Designed by Antigravity
                </p>
                <ul className='flex gap-6 list-none text-slate-400 dark:text-slate-600'>
                    <li className="hover:text-blue-600 cursor-pointer transition-colors"><FaFacebook size={20}/></li>
                    <li className="hover:text-red-500 cursor-pointer transition-colors"><FaYoutube size={20}/></li>
                    <li className="hover:text-blue-400 cursor-pointer transition-colors"><FaTwitter size={20}/></li>
                    <li className="hover:text-indigo-500 cursor-pointer transition-colors"><FaDiscord size={20}/></li>
                </ul>
            </div>
          </div>
      </div>
  </div>;
};

export default Footer;
