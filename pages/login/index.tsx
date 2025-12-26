import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getMe, login, signUpAPI } from '../../libs/api/authAPI';

const Login:React.FC = () => {
  const [loadding, setLoading] = useState(true);
  const [isSingup,setSingup] = useState(false);
  const [username,setUserName] = useState<string>('');
  const [password,setPassWord] = useState<string>('');
  const [RPass,setRPass] = useState<string>('');
  const [email,setEmail] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await getMe();
        if(res.username){
          if (res.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/user/account');
          }
        }
      } catch (error) {
        setLoading(false);
      }
    }
    checkLogin();
  },[])
  const signIn = async () => {
    try {
      const res = await login(username,password);
      if(res.status === 200 || res.status === 201){
        if (res.data.access_token) {
          localStorage.setItem('jwtToken',res.data.access_token);
          localStorage.setItem('userInfo',JSON.stringify(res.data.user));
          if (res.data.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        }
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
  useEffect(()=>{
    setUserName('');
    setPassWord('');
    setRPass('');
    setEmail('');
  },[isSingup]);
  if (!mounted) return null;

  if(loadding) {
    return <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
        <p className="font-bold text-slate-400 dark:text-slate-600 animate-pulse uppercase tracking-[0.2em] text-xs">đang tải dữ liệu...</p>
    </div>
  }
  
  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden p-6'>
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 dark:bg-primary-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-10">
            <span className="text-4xl font-black bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">YourBooks</span>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Khám phá thế giới truyện tranh & chữ</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800/50 overflow-hidden">
            <div className="flex p-2 bg-slate-50 dark:bg-slate-800/50 m-4 rounded-2xl">
                <button 
                    onClick={()=>setSingup(false)} 
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${ !isSingup ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                    Đăng nhập
                </button>
                <button 
                    onClick={()=>setSingup(true)} 
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${ isSingup ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                    Đăng ký
                </button>
            </div>

            <div className="p-10 pt-4">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên đăng nhập</label>
                        <input 
                            value={username || ''} 
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value)} 
                            type="text" 
                            className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all shadow-inner"
                            placeholder="username"
                        />
                    </div>

                    { isSingup && (
                        <div className="space-y-2 animate-in slide-in-from-top-4 duration-300">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ Email</label>
                            <input 
                                value={email || ''} 
                                onChange={(e:ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} 
                                type="email" 
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all shadow-inner"
                                placeholder="name@example.com"
                            />
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu</label>
                        <input 
                            value={password || ''} 
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>setPassWord(e.target.value)} 
                            type="password" 
                            className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all shadow-inner"
                            placeholder="••••••••"
                        />
                    </div>

                    { isSingup && (
                        <div className="space-y-2 animate-in slide-in-from-top-4 duration-300">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nhập lại mật khẩu</label>
                            <input 
                                value={RPass || ''} 
                                onChange={(e:ChangeEvent<HTMLInputElement>)=>setRPass(e.target.value)} 
                                type="password" 
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all shadow-inner"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <button 
                        onClick={isSingup ? signUp : signIn} 
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl shadow-xl shadow-primary-500/25 transition-all active:scale-95 text-lg mt-4"
                    >
                        {isSingup ? 'Tiếp tục đăng ký' : 'Đăng nhập ngay'}
                    </button>
                    
                    { !isSingup ? (
                        <div className="space-y-4 pt-6 text-center">
                            <Link legacyBehavior passHref href='#'>
                                <a className="block text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors uppercase tracking-widest">quên mật khẩu?</a>
                            </Link>
                            <div className="h-[1px] w-12 bg-slate-100 dark:bg-slate-800 mx-auto"></div>
                            <Link legacyBehavior passHref href='/'>
                                <a className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                                    Quay lại trang chủ
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
                            Bằng cách đăng ký, bạn đồng ý với <a href="#" className="underline">Điều khoản dịch vụ</a> và <a href="#" className="underline">Chính sách bảo mật</a> của chúng tôi.
                        </p>
                    )}
                </div>
            </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 dark:text-slate-600 text-xs font-medium">
            © 2024 YourBooks Entertainment • All rights reserved
        </p>
      </div>
    </div>
  )
}

export default Login