import React from 'react';
import {FaDiscord, FaFacebook, FaTwitter, FaYoutube} from 'react-icons/fa'
const Footer: React.FC = () => {
  return <div className='w-ful border-t'>
      <ul className="mx-auto flex justify-center items-center w-full h-16 border-b list-none">
          <li className='p-3'>Giới thiệu</li>
          <li className='p-3'>Quy định chung</li>
          <li className='p-3'>Liên hệ</li>
          <li className='p-3'>Bản quyền</li>
          <li className='p-3'>Báo lỗi</li>
      </ul>
      <div className="mx-auto container flex px-5">
        <div className="md:basis-4/12 flex flex-col p-4">
            <span className="text-2xl font-bold p-2">Your Books</span>
            <p className="text-gray-800 p-2">
                <i>Nơi bạn có thể đọc truyện yêu thích với chuyện chữ, truyện tranh và audio truyện, bạn có thể tự do đăng tải những tác phẩm của chính mình, hoặc bản dịch của nhóm. Hãy đăng ký tài khoản ngay hôm nay.</i>
                
            </p>
            <div className="flex mt-3">
                <button className="p-3 bg-green-400 rounded-md">Đăng nhập</button>
                <button className="p-3 ml-2 text-green-400">Đăng ký</button>
            </div>
        </div>
        <div className="md:basis-8/12 flex flex-col py-4 pl-5">
            <div className="flex">
                
            </div>
            <div className="py-2">
                <span className="p-2"><b>Loại truyện</b></span>
                <ul className='flex list-none'>
                    <li className='px-3 py-2'>Truyện chữ</li>
                    <li className='px-3 py-2'>Truyện tranh</li>
                    <li className='px-3 py-2'>Truyện audio</li>
                </ul>

            </div>
            <div className="mt-3">
                <span className="p-2"><b>Thể loại</b></span>
                <ul className='flex list-none flex-wrap'>
                    <li className="basis-3/12 px-3 py-1">Truyện tiên hiệp</li>
                    <li className="basis-3/12 px-3 py-1">Truyện tiên hiệp</li>
                    <li className="basis-3/12 px-3 py-1">Truyện ngôn tình</li>
                    <li className="basis-3/12 px-3 py-1">Truyện linh dị</li>
                    <li className="basis-3/12 px-3 py-1">Truyện trinh thám</li>
                    <li className="basis-3/12 px-3 py-1">Truyện khinh dị</li>
                    <li className="basis-3/12 px-3 py-1">Truyện đam mỹ</li>
                    <li className="basis-3/12 px-3 py-1">Truyện cười</li>
                    <li className="basis-3/12 px-3 py-1">Truyện võng du</li>
                    <li className="basis-3/12 px-3 py-1">Truyện huyền huyễn</li>
                    <li className="basis-3/12 px-3 py-1">Truyện khoa huyễn</li>
                    <li className="basis-3/12 px-3 py-1">Truyện lịch sử</li>
                    <li className="basis-3/12 px-3 py-1">Truyện đô thị</li>
                    <li className="basis-3/12 px-3 py-1">Truyện mạt thế</li>
                    <li className="basis-3/12 px-3 py-1">Truyện kiếm hiệp</li>
                </ul>
            </div>
        </div>
      </div>
      <div className="container mx-auto">
          <ul className='py-3 flex justify-center list-none'>
              <li className="px-4"><FaFacebook/></li>
              <li className="px-4"><FaYoutube/></li>
              <li className="px-4"><FaTwitter/></li>
              <li className="px-4"><FaDiscord/></li>
          </ul>
            <p className='py-3 font-bold text-gray-900/50 text-[12px] w-full text-center mb-3'>© 2022 copyright tran tri</p>
      </div>
  </div>;
};

export default Footer;
