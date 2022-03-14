import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAllCates } from '../../customHooks/reactQuery/Categoris';
import { Author } from '../../interface/_Author';
import { Category } from '../../interface/_Category';
import { Novel } from '../../interface/_Novel';
import { getAuthors } from '../../libs/api/authorAPI';
import { addnewNovel, updateNovel } from '../../libs/api/novelAPI';
import { upLoadPoster } from '../../libs/api/uploadFile';
import CreateAuthorPopUp from '../popup/CreateAuthorPopUp';
import CreateCategoryPopup from '../popup/CreateCategoryPopup';
import PosterPopup from '../popup/PostersPopup';

interface NovelPageProps{
    isUpdate: boolean,
    novelData?: Novel<Author,Category>
    closePopup?: ()=>void | undefined
}

export const toastConfig:ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  }

const NovelPage:React.FC<NovelPageProps> = ({isUpdate,novelData,closePopup}:NovelPageProps) => {
  const [imgfile,setIMG] = useState<File | null>(null);
  // const [authpicked,setAuthPicked] = useState(false);
  const [authorSearch,setAuthorSearch] = useState('');
  const [preShow,setPreshow] = useState<string | null>();
  const [openPopup,setOpenPopup] = useState<'none' | 'images' | 'createAuthor' | 'createCategory'>('none');
/////////////// input state ////////////
  const allCates = useGetAllCates();
  let initNovel = {} as Novel<string,string>;

  if (novelData) {
    initNovel = {
        title: novelData.title,
        author: novelData.author._id,
        category: novelData.category._id,
        // chapCount: novelData.chapCount,
        description: novelData.description,
        image: novelData.image
    };
  }

  const [novel,setNovel] = useState<Novel<string,string>>(initNovel);

  const [authList,setAuthList] = useState<Author[]>([]);
  useEffect(()=>{
    if (novelData) {
        setAuthorSearch(novelData.author.name);
        setPreshow(novelData.image);
    }       
    setNovel(initNovel);
    console.log('preShow',preShow);
    console.log('novelimg',novel.image);
    
  },[]);
  const handleReset = () => {
    
    setNovel(initNovel);
    setPreshow(null);
    setIMG(null);
  }



const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | FocusEvent<HTMLTextAreaElement>)=>{
  const {name,value} = e.target;
  setNovel(pre=>({...pre, [name]: value}))
}

const handleFindAuthor = async (e:ChangeEvent<HTMLInputElement>) => {
  setNovel(pre=>({...pre,author:''}));
  await setAuthorSearch(e.target.value);
  if (authorSearch == '' || e.target.value == '') {
    setAuthList([]);
    return
  }
  try {
    const result = await getAuthors(authorSearch);
    setAuthList([...result]);
  } catch (error) {
    setAuthList([]);
  }
}


  const addNewPoster = async () => {
    if (!imgfile ) {
        if(preShow){
            await isUpdate ? editNovel(novel) : uploadNovel(novel);
            return
        } 
        if(!preShow){
            alert('vui lòng chọn ảnh poster');
            return
        }
        return
    }
   
    const formData = new FormData();
    formData.append('poster',imgfile);
    const imgToast = toast.loading('Đang tải ảnh lên');
    try {
      const posterUploaded = await upLoadPoster(formData);
      if (posterUploaded.secure_url) {
        const newNovel = {...novel};
        newNovel.image = posterUploaded.secure_url;
        setNovel(pre=>({...pre,image: posterUploaded.secure_url}));
        toast.update(imgToast,{ render: "Tải ảnh thành công", type: "success", isLoading: false, autoClose: 5000 });
        await isUpdate ? editNovel(newNovel) : uploadNovel(newNovel);
      }
    } catch (error) {
      toast.update(imgToast,{ render: "Tải ảnh thất bại", type: "error", isLoading: false, autoClose: 5000 })
    }
  }
  const uploadNovel = async (newNovel:Novel<string,string>) => {

   let NovelToastUpload = toast.loading('Đang đăng tải truyện');
    try {
      const res = await addnewNovel(newNovel);
      toast.update(NovelToastUpload,{ render: "Đăng thành công", type: "success", isLoading: false, autoClose: 5000 });
      handleReset();
      
    } catch (error) {
      toast.update(NovelToastUpload,{ render: "Lỗi đăng tải truyện", type: "error", isLoading: false, autoClose: 5000 })

    }
  }
  const handleFile = async (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIMG(e.target.files[0]);
      let Reader = new FileReader();
      Reader.onloadend = () => {
        setPreshow(Reader.result?.toString());
      }
      Reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0])

    }
    
  }
  const getImageFromPopup = (imgFromPopup: string) => {
    setPreshow(imgFromPopup);
    setNovel(pre=>({...pre,image: imgFromPopup}));
    setIMG(null);
    setOpenPopup('none');
  }
  const editNovel = async (newNovel:Novel<string,string>) => {
    let updateToast = toast.loading('đang update thông tin');
    try {
      if (novelData?._id) {
        const res = await updateNovel(novelData._id,newNovel);
        if (res.status = 200) {
        toast.update(updateToast,{ render: "chỉnh sửa thành công", type: "success", isLoading: false, autoClose: 5000, pauseOnFocusLoss:false });      
        if (closePopup) {
          closePopup(); 
        } 
      }
      }
    } catch (error) {
      toast.update(updateToast,{ render: "thay đổi thất bại", type: "error", isLoading: false, autoClose: 5000 });
      
    }
  }
    return (
        <div className="w-full min-h-screen">
            <div className="w-full min-h-screen bg-white">
            <span className="w-full block px-5 py-3 text-2xl font-bold relative">
              {isUpdate ? 'chỉnh sửa nội dung truyện' : 'Thêm truyện mới'}
            </span>
            <div className="w-full p-5 bg-white">
              <div className="flex items-center mb-7 ">
                <label htmlFor="novelname" className=" w-[200px] px-3">tên truyện</label>
                <input name="title" value={'' || novel.title} onChange={handleInputChange} type="text" className="w-[500px] outline-none border border-width-1 px-2 py-1 rounded-md" placeholder="nhập vào tên truyện"/>
              </div>
              <div className="flex items-center mb-7 ">
                <label htmlFor="author" className=" w-[200px] px-3">tác giả</label>
                <div className="flex relative border border-width-1 rounded-md min-w-[500px]">
                  <input name="author" autoComplete="off" value={'' || authorSearch} onChange={handleFindAuthor} type="text" className="w-[350px] outline-none px-2 py-1 rounded-md" placeholder="thêm vào tác giả"/>
                    <div className="w-[120px]">
                      { 
                        (authorSearch != '' && novel.author == '')&&<span className='block text-red-600 text-center py-1'>không tồn tại</span>
                      }
                    
                    </div>

                  <ul className="absolute top-[34px] w-[500px] shadow-md bg-white">
                    {
                      authList.map((item,index)=>{
                        return <li onClick={()=>{
                          setNovel(pre=>({...pre,author: item._id}))
                          setAuthorSearch(item.name);
                          // setAuthPicked(true);
                          setAuthList([])
                        }} className="w-full px-3 py-1" key={index}>{item.name}</li>
                      })
                    }
                  </ul>
                  
                </div>
                <button onClick={()=>setOpenPopup('createAuthor')} className="py-1 px-2 bg-white text-green-600"><IoMdAddCircle className='text-2xl'/></button>
                
              </div>
              <div className="flex items-center mb-7 ">
                <label htmlFor="category" className=" w-[200px] px-3">danh mục</label>
                <select value={'' || novel.category} onChange={handleInputChange} name="category" className="w-[500px] outline-none border border-width-1 px-2 py-1 rounded-md" placeholder="">
                  <option value="">---- vui lòng chọn thể loại ----</option>
                  {
                    allCates.isSuccess && allCates.data.map((item,index)=>{
                      return <option key={index} value={item._id}>{item.cate}</option>
                    })
                  }
            
                </select>
                <button onClick={()=>setOpenPopup('createCategory')} className="py-1 px-2 bg-white text-green-600"><IoMdAddCircle className='text-2xl'/></button>
              </div>
              <div className="flex items-center mb-7 ">
                <label htmlFor="description" className=" w-[200px] px-3">mô tả vắn tắt</label>
                <textarea name="description" value={'' || novel.description} onBlur={handleInputChange} onChange={handleInputChange} className="w-[500px] outline-none border border-width-1 px-2 py-1 rounded-md min-h-[200px]" placeholder="thêm vào mô tả về truyện"/>
              </div>
              <div className="flex mb-7 ">
                <label htmlFor="image" className=" w-[200px] px-3">ảnh bìa</label>
                <div className="w-[200px] h-[230] relative overflow-hidden border-2">
                  
                { 
                  (preShow || novel.image) && <Image className="absolute object-cover" src={ preShow || novel.image } layout="fill"/>
                }
                <input onChange={handleFile} type="file" className="opacity-20 w-[200px] h-[200px] relative after:w-full after:h-full after:absolute after:content-['chọn_từ_thiết_bị'] after:bg-white after:left-0 after:top-0 after:flex after:justify-center after:items-center after:text-xl after:border-2 after:cursor-pointer after:text-wrap"/>

                </div>
                <button onClick={()=>setOpenPopup('images')} className="px-2 py-1 bg-blue-500 text-white h-[100px] w-[100px] ml-4 self-center"> hoặc chọn poster có sẵn tại đây</button>
              </div>
              <div className="flex mb-7 mt-7 justify-center w-[500px]">
                {
                 isUpdate ? <button onClick={addNewPoster} className="px-2 py-1 text-white bg-blue-500">chỉnh sửa</button>
                  :
                  <button onClick={addNewPoster} className="px-2 py-1 text-white bg-blue-500">Thêm truyện</button>
                }
                <button onClick={handleReset} className="ml-5 px-2 py-1 bg-gray-200">làm mới</button>
              </div>
            </div>
        </div>
        {
          openPopup == 'createAuthor' && (
            <CreateAuthorPopUp showToast = {()=>{
              toast.success('tạo tác giả thành công',toastConfig);
              setOpenPopup('none');
            }} closePopup={()=>setOpenPopup('none')}/>
          )
        }
        {
          openPopup == 'createCategory' && (
            <CreateCategoryPopup showToast = {()=>{
              toast.success('thêm thể loại thành công',toastConfig);
              setOpenPopup('none');
              allCates.refetch();
            }} closePopup={()=>setOpenPopup('none')}/>
          )
        }
        {
          openPopup == 'images' &&(
            <PosterPopup choonseImage={getImageFromPopup} closePopup={()=>setOpenPopup('none')}/>
          )
        }
        
        </div>
    )
}

export default NovelPage;