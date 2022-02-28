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
    const newCate:CategoryWithOutId = {
        cate: cateName,
        e_cate: e_cate,
    }
    try {
        await storeNewCate(newCate);
        showToast();
    } catch (error) {
        alert('lỗi không tạo được thể loại');
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/10'>
            <div className="px-5 py-3 flex flex-col items-center w-[400px] min-h-[200px] bg-white shadow-md relative">
                <AiFillCloseSquare onClick={closePopup} className=' text-red-600 text-4xl absolute top-0 right-0 cursor-pointer' />
                <span className="text-xl font-bold">Thêm thể loại mới</span>
                <div className="mt-2 w-5/6">
                    <label className='w-full block py-1'>Thể loại(<b className='text-red-600'>*</b>)</label>
                    <input name='cate' value = {'' || cateName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setCateName(e.target.value)} type="text" className=" w-full border border-width-1 py-1 px-2 outline-none rounded-md" />
                </div>
                <div className="mt-2 w-5/6">
                    <label className='w-full block py-1'>Thể loại tiếng anh (nếu có)</label>
                    <input name='e_cate' value={ '' || e_cate } onChange={(e:ChangeEvent<HTMLInputElement>)=>setEcate(e.target.value)} type="text" className="w-full border border-width-1 py-1 px-2 outline-none rounded-md" />
                </div>
            
                <button onClick={addnewCate} className='py-1 px-2 bg-blue-500 text-white rounded-sm mt-5 mb-5'>Thêm</button>
        </div>
    </div>
  )
}

export default CreateCatePopUp