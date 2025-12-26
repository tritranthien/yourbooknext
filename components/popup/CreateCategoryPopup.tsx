import React, { ChangeEvent, useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { CategoryWithOutId } from '../../interface/_Category';
import { storeNewCate } from '../../libs/api/category';
interface PopUpProps{
    showToast:()=>void,
    closePopup: ()=>void
}

const CreateCatePopUp:React.FC<PopUpProps> = ({showToast,closePopup}: PopUpProps) => {
  
  const [cateName,setCateName] = useState('');
  const [e_cate,setEcate] = useState('');

  const addnewCate = async () => {
    if (!cateName.trim()) {
        alert('Vui lòng nhập tên thể loại');
        return;
    }

    const newCate:CategoryWithOutId = {
        cate: cateName,
        e_cate: e_cate,
    }
    try {
        await storeNewCate(newCate);
        showToast();
        closePopup();
    } catch (error) {
        alert('lỗi không tạo được thể loại');
    }
  }

  return (
    <div className='fixed inset-0 z-[2000] flex justify-center items-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300'>
        <div className="flex flex-col items-center w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button onClick={closePopup} className='absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all'>
                <AiFillCloseSquare size={24} />
            </button>
            <div className="pt-10 pb-4 text-center">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">Thêm thể loại</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Phân loại tác phẩm theo chủ đề</p>
            </div>

            <div className="mt-4 w-full px-8">
                <label className='w-full block py-1 text-sm font-semibold text-slate-700 dark:text-slate-300'>Tên thể loại (<span className='text-red-500'>*</span>)</label>
                <input name='cate' value={cateName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setCateName(e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 px-4 outline-none rounded-xl focus:ring-2 focus:ring-primary-500/20 transition-all" placeholder="Ví dụ: Tiên Hiệp, Đô Thị..." />
            </div>
            <div className="mt-4 w-full px-8">
                <label className='w-full block py-1 text-sm font-semibold text-slate-700 dark:text-slate-300'>Tên tiếng Anh (nếu có)</label>
                <input name='e_cate' value={e_cate} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEcate(e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 px-4 outline-none rounded-xl focus:ring-2 focus:ring-primary-500/20 transition-all" placeholder="English name..." />
            </div>
            
            <div className="w-full px-8 py-8 mt-4 flex gap-3">
               <button onClick={closePopup} className='flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all'>Hủy</button>
               <button onClick={addnewCate} className='flex-[1.5] py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95'>Thêm ngay</button>
            </div>
        </div>
    </div>
  )
}

export default CreateCatePopUp