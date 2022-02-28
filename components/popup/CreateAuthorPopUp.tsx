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
    const newAuthor:AuthorWithOutId = {
        name: authorName,
        birth: new Date(authorBirth),
        des: authorDes
    }
    try {
        await storeNewAuthor(newAuthor);
        showToast();
    } catch (error) {
        alert('lỗi không tạo được tác giả');
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/10'>
            <div className="px-5 py-3 flex flex-col items-center w-[400px] min-h-[400px] bg-white shadow-md relative">
                <AiFillCloseSquare onClick={closePopup} className=' text-red-600 text-4xl absolute top-0 right-0 cursor-pointer' />
                <span className="text-xl font-bold">Tạo tác giả mới</span>
                <div className="mt-2 w-5/6">
                    <label className='w-full block py-1'>Tên tác giả(<b className='text-red-600'>*</b>)</label>
                    <input name='name' value = {'' || authorName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setAuthorName(e.target.value)} type="text" className=" w-full border border-width-1 py-1 px-2 outline-none rounded-md" />
                </div>
                <div className="mt-2 w-5/6">
                    <label className='w-full block py-1'>Ngày sinh (nếu có)</label>
                    <input name='birth' value={ '' || authorBirth } onChange={(e:ChangeEvent<HTMLInputElement>)=>setAuthorBitrh(e.target.value)} type="date" className="w-full border border-width-1 py-1 px-2 outline-none rounded-md" />
                </div>
                <div className="mt-2 w-5/6">
                    <label className='w-full block py-1'>Mô tả sơ lược (nếu có)</label>
                    <textarea name='des' className=" w-full h-[100px] border border-width-1 py-1 px-2 outline-none rounded-md" />
                </div>
                <button onClick={addNewAuthor} className='py-1 px-2 bg-blue-500 text-white rounded-sm mt-5 mb-5'>Thêm</button>
        </div>
    </div>
  )
}

export default CreateAuthorPopUp