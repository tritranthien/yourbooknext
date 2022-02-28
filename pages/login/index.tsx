import React, { useState } from 'react'

const index:React.FC = () => {
  const [isSingup,setSingup] = useState(false);
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-screen h-screen flex justify-center items-center'>
      <div className="w-[300px] min-h-[400px] bg-white rounded-md shadow-md">
        <div className="flex w-full-width bg-gray-200 cursor-pointer">
          <span onClick={()=>setSingup(false)} className={`w-1/2 text-center ${ isSingup ? '' : 'bg-white'} px-3 font-bold h-10 leading-10`}>Đăng nhập</span>
          <span onClick={()=>setSingup(true)} className={`w-1/2 text-center ${ isSingup ? 'bg-white' : ''} px-3 font-bold h-10 leading-10`}>Đăng ký</span>
        </div>
        <div className="w-full p-7">
          <label htmlFor="username" className="w-full text-sm">Tên đăng nhập</label>
          <input type="text" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          { isSingup && <>
            <label htmlFor="email" className="w-full text-sm">Email</label>
            <input type="text" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          </>}
          
          <label htmlFor="password" className="w-full text-sm">Mật khẩu</label>
          <input type="text" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          { isSingup && <>
            <label htmlFor="retypePassword" className="w-full text-sm">Nhập lại mật khẩu</label>
          <input type="text" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          </>}
          
          <button className="px-3 py-1 mt-4 bg-blue-500 text-white rounded-md mx-auto">Đăng ký</button>
          <br />
          { !isSingup && <a href="#" className="block text-blue-400 mt-5 w-full text-center">quên mật khẩu?</a>}
        </div>
      </div>
    </div>
  )
}

export default index