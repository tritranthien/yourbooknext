import React,{ChangeEvent, useState} from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { Author, AuthorWithOutId } from '../../interface/_Author'
import { storeNewAuthor } from '../../libs/api/authorAPI';
interface PopUpProps{
    showToast:()=>void,
    closePopup: ()=>void
}




const CreateAuthorPopUp:React.FC<PopUpProps> = ({showToast,closePopup}: PopUpProps) => {
  
  const [authorName,setAuthorName] = useState('');
  const [authorBirth,setAuthorBitrh] = useState('');
  const [authorDes,setAuthorDes] = useState('');

  const addNewAuthor = async () => {
    if (!authorName.trim()) {
        alert('Vui lòng nhập tên tác giả');
        return;
    }

    const newAuthor:AuthorWithOutId = {
        name: authorName,
        birth: authorBirth ? new Date(authorBirth).toISOString() : null,
        des: authorDes
    }
    try {
        await storeNewAuthor(newAuthor);
        showToast();
        closePopup();
    } catch (error) {
        alert('lỗi không tạo được tác giả');
    }
  }

  return (
    <div className='fixed inset-0 z-[2000] flex justify-center items-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300'>
            <div className="flex flex-col items-center w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative animate-in zoom-in-95 duration-300">
                <button onClick={closePopup} className='absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all'>
                    <AiFillCloseSquare size={24} />
                </button>
                <div className="pt-10 pb-4 text-center">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">Tác giả mới</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Điền thông tin để thêm người sáng tạo</p>
                </div>
                <div className="mt-4 w-full px-6">
                    <label className='w-full block py-1 text-sm font-semibold text-slate-700 dark:text-slate-300'>Tên tác giả (<span className='text-red-500'>*</span>)</label>
                    <input name='name' value={authorName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setAuthorName(e.target.value)} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 px-4 outline-none rounded-xl focus:ring-2 focus:ring-primary-500/20 transition-all" placeholder="Nhập tên tác giả..." />
                </div>
                <div className="mt-4 w-full px-6">
                    <label className='w-full block py-1 text-sm font-semibold text-slate-700 dark:text-slate-300'>Ngày sinh (nếu có)</label>
                    <input name='birth' value={authorBirth} onChange={(e:ChangeEvent<HTMLInputElement>)=>setAuthorBitrh(e.target.value)} type="date" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 px-4 outline-none rounded-xl focus:ring-2 focus:ring-primary-500/20 transition-all" />
                </div>
                <div className="mt-4 w-full px-6">
                    <label className='w-full block py-1 text-sm font-semibold text-slate-700 dark:text-slate-300'>Mô tả sơ lược (nếu có)</label>
                    <textarea name='des' value={authorDes} onChange={(e)=>setAuthorDes(e.target.value)} className="w-full h-32 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 px-4 outline-none rounded-xl focus:ring-2 focus:ring-primary-500/20 transition-all resize-none" placeholder="Thông tin thêm về tác giả..." />
                </div>
                <div className="w-full px-6 py-6 mt-4 flex gap-3">
                   <button onClick={closePopup} className='flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all'>Hủy</button>
                   <button onClick={addNewAuthor} className='flex-2 py-3 px-8 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-95'>Tạo tác giả</button>
                </div>
        </div>
    </div>
  )
}

export default CreateAuthorPopUp