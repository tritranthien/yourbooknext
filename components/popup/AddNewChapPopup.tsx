import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify';
import { SerVerNovel } from '../../interface/_Novel'
import { addNewChap } from '../../libs/api/novelAPI'

interface PopupProps{
  novel: SerVerNovel,
  closeChap: ()=>void
}

const AddNewChapPopup:React.FC<PopupProps> = ({novel,closeChap}:PopupProps) => {
  
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');

  const handleReset = () => {
    setTitle('');
    setContent('');
  }

  const handleUploadChap = async () => {
    
    const chap = {
      title: title,
      content: content,
      novel: novel._id
    }
    let upChapToast = toast.loading(`đang đăng chương mới: '${title}'`)
    try {
      const res = await addNewChap(chap);
      toast.update(upChapToast,{ render:`đã đăng chương: ${title}`,autoClose: 5000, type: 'success',isLoading: false})
      handleReset();
    } catch (error) {
      
      toast.update(upChapToast,{ render:`lỗi đăng tải chương: ${title}`,autoClose: 5000, type: 'error',isLoading: false})
    }
  }
  
  return (
    <div className="fixed flex justify-center top-0 left-0 right-0 bottom-0 bg-black/20">
      <div className="w-[850px] bg-white p-10 overflow-y-auto">
        <div className="w-full">
          <span className="block font-bold text-blue-700 text-2xl">{novel.title}</span>
          <span className="block text-gray-400">{novel.author?.name || 'Đang cập nhật'}</span>
          <div className="flex mb-10">
            <span className="block rounded-md text-lime-7000">{(novel.category && typeof novel.category === 'object') ? (novel.category as any).cate : 'Chưa phân loại'}</span>
            <span className="block rounded-md ml-5 text-purple-700">{`${novel.chapCount} chương`}</span>
          </div>
        </div>
        <span className="w-full p-1">Tiêu đề chương</span>
        <input onChange={(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)} name="title" type="text" className="w-full mt-2 mb-5 outline-none rounded-md px-2 py-1 border border-width-[1px]" placeholder="tiêu đề chương"/>
        <span className="w-full p-1">Nội dung chương</span>
        <textarea onBlur={(e:ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)} onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)} name="content" className="w-full mt-2 mb-10 min-h-[400px] outline-none rounded-md px-2 py-1 border border-width-[1px]" placeholder="nội dung chương"/> 
        <button onClick={handleUploadChap} className="rounded-sm px-2 py-1 bg-blue-500 text-white w-[60px] mr-3">đăng</button>
        <button onClick={closeChap} className="rounded-sm px-2 py-1 bg-gray-300 w-[60px]">hủy</button>
      </div>

    </div>
  )
}

export default AddNewChapPopup