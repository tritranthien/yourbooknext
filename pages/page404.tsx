import Link from 'next/link'
import React from 'react'

const page404 = () => {
  return (
    <div className="w-full h-[550px] flex flex-col justify-center items-center container">
            <span className="text-7xl font-bold">404</span>
            <span className="font-bold text-xl">không có dữ liệu, vui lòng coi lại đường dẫn, hoặc <Link passHref href='/'><a className='text-sky-500'>ấn vào đây để quay lại trang chủ</a></Link></span>
    </div>
  )
}

export default page404