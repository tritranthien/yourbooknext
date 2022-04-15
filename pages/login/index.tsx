import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getMe, login, signUpAPI } from '../../libs/api/authAPI';

const Login:React.FC = () => {
  const router = useRouter();
  const [loadding, setLoading] = useState(true);
  const [isSingup,setSingup] = useState(false);
  const [username,setUserName] = useState<string>('');
  const [password,setPassWord] = useState<string>('');
  const [RPass,setRPass] = useState<string>('');
  const [email,setEmail] = useState<string>('');
  useEffect(()=>{
    const checkLogin = async () => {
      try {
        const res = await getMe();
          router.push('/user/account');
      } catch (error) {
        setLoading(false);
      }
    }
    checkLogin();
  },[])
  const signIn = async () => {
    try {
      const res = await login(username,password);
      if(res.status === 200){
        localStorage.setItem('jwtToken',res.data.token);
        localStorage.setItem('userInfo',JSON.stringify(res.data.user));
        router.push('/');
      }
    } catch (error) {
      alert('đã xảy ra lỗi khi đăng nhập');
      
    }
  }
  const signUp = async () => {
    try {
      const res = await signUpAPI(username,password,email);
      if(res.status === 200){
        toast.success('Đăng ký thành công');
        setSingup(false);
      }
    } catch (error) {
      alert('đã xảy ra lỗi khi đăng ký');
    }
  }
  if(loadding) {
    return <div className="flex justify-center items-center w-screen h-screen font-extrabold text-3xl"> loading...</div>
  }
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-screen h-screen flex justify-center items-center'>
      <div className="w-[300px] min-h-[400px] bg-white rounded-md shadow-md">
        <div className="flex w-full-width bg-gray-200 cursor-pointer">
          <span onClick={()=>setSingup(false)} className={`w-1/2 text-center ${ isSingup ? '' : 'bg-white'} px-3 font-bold h-10 leading-10`}>Đăng nhập</span>
          <span onClick={()=>setSingup(true)} className={`w-1/2 text-center ${ isSingup ? 'bg-white' : ''} px-3 font-bold h-10 leading-10`}>Đăng ký</span>
        </div>
        <div className="w-full p-7">
          <label htmlFor="username" className="w-full text-sm">Tên đăng nhập</label>
          <input  onChange={(e:ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value)} type="text" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          { isSingup && <>
            <label htmlFor="email" className="w-full text-sm">Email</label>
            <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} type="text" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          </>}
          
          <label htmlFor="password" className="w-full text-sm">Mật khẩu</label>
          <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setPassWord(e.target.value)} type="password" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          { isSingup && <>
            <label htmlFor="retypePassword" className="w-full text-sm">Nhập lại mật khẩu</label>
          <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setRPass(e.target.value)} type="password" className="w-full px-2 py-1 outline-none rounded-md border border-gray-400 mt-2 mb-3" />
          </>}
          
          <button onClick={isSingup ? signUp : signIn} className="px-3 py-1 mt-4 bg-blue-500 text-white rounded-md mx-auto">{isSingup ? 'Đăng ký' : 'Đăng nhập'}</button>
          <br />
          { !isSingup && <a href="#" className="block text-blue-400 mt-5 w-full text-center">quên mật khẩu?</a>}
        </div>
      </div>
    </div>
  )
}

export default Login