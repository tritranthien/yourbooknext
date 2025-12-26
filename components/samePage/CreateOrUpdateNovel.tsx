import { debounce } from 'lodash';
import Image from 'next/image';
import React, { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAllCates } from '../../customHooks/reactQuery/Categoris';
import { Author } from '../../interface/_Author';
import { Novel, SerVerNovel } from '../../interface/_Novel';
import { getAuthors } from '../../libs/api/authorAPI';
import { addnewNovel, updateNovel } from '../../libs/api/novelAPI';
import { upLoadPoster } from '../../libs/api/uploadFile';
import CreateAuthorPopUp from '../popup/CreateAuthorPopUp';
import CreateCategoryPopup from '../popup/CreateCategoryPopup';
import PosterPopup from '../popup/PostersPopup';

interface NovelPageProps{
    isUpdate: boolean,
    novelData?: SerVerNovel,
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
  const [authorSearch,setAuthorSearch] = useState('');
  const [preShow,setPreshow] = useState<string | null>();
  const [openPopup,setOpenPopup] = useState<'none' | 'images' | 'createAuthor' | 'createCategory'>('none');
  
  const allCates = useGetAllCates();
  let initNovel = {
    title: '',
    author: '',
    category: '',
    description: '',
    status: 'continue',
    image: ''
  } as Novel<string,string>;

  if (novelData) {
    initNovel = {
        title: novelData.title,
        author: novelData.author?._id || '',
        category: (novelData.category as any)?._id || (novelData.category as any) || '',
        description: novelData.description,
        status: novelData.status,
        image: novelData.image
    };
  }

  const [novel,setNovel] = useState<Novel<string,string>>(initNovel);
  const [authList,setAuthList] = useState<Author[]>([]);

  useEffect(() => {
    if (novelData) {
        setAuthorSearch(novelData.author?.name || '');
        setPreshow(novelData.image);
        setNovel({
            title: novelData.title,
            author: novelData.author?._id || '',
            category: (novelData.category as any)?._id || (novelData.category as any) || '',
            description: novelData.description,
            status: novelData.status,
            image: novelData.image
        });
    } else {
        setNovel({
            title: '',
            author: '',
            category: '',
            description: '',
            status: 'continue',
            image: ''
        });
    }
  }, [novelData]);

  const handleReset = () => {
    setNovel(initNovel);
    setAuthorSearch('');
    setPreshow(null);
    setIMG(null);
  }

  const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | FocusEvent<HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setNovel(pre=>({...pre, [name]: value}));
  }

  const debouncedSave = useCallback(
    debounce( async (nextValue:string) => {
        if(nextValue.length > 0) {
            const res = await getAuthors(nextValue);
            setAuthList([...res]); 
        }else{
            setAuthList([]);
        }
    }, 1000),
    [],
  );

  const handleFindAuthor = (e:ChangeEvent<HTMLInputElement>) => {
    setNovel(pre=>({...pre,author:''}));
    setAuthorSearch(e.target.value);
    debouncedSave(e.target.value);
  }

  const addNewPoster = async () => {
    if (!imgfile ) {
        if(preShow || novel.image){
            isUpdate ? await editNovel(novel) : await uploadNovel(novel);
            return
        } 
        alert('Vui lòng chọn ảnh bìa cho truyện');
        return
    }
   
    const formData = new FormData();
    formData.append('poster',imgfile);
    const imgToast = toast.loading('Đang tải ảnh lên hệ thống...');
    try {
      const posterUploaded = await upLoadPoster(formData);
      if (posterUploaded.secure_url) {
        const updatedNovel = {...novel, image: posterUploaded.secure_url};
        setNovel(updatedNovel);
        toast.update(imgToast,{ render: "Tải ảnh thành công", type: "success", isLoading: false, autoClose: 3000 });
        isUpdate ? await editNovel(updatedNovel) : await uploadNovel(updatedNovel);
      }
    } catch (error) {
      toast.update(imgToast,{ render: "Tải ảnh thất bại", type: "error", isLoading: false, autoClose: 3000 })
    }
  }

  const uploadNovel = async (newNovel:Novel<string,string>) => {
    let uploadToast = toast.loading('Đang khởi tạo truyện mới...');
    try {
      await addnewNovel(newNovel);
      toast.update(uploadToast,{ render: "Thêm truyện thành công!", type: "success", isLoading: false, autoClose: 5000 });
      handleReset();
    } catch (error) {
      toast.update(uploadToast,{ render: "Lỗi khi thêm truyện mới", type: "error", isLoading: false, autoClose: 5000 })
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
    }
  }

  const getImageFromPopup = (imgFromPopup: string) => {
    setPreshow(imgFromPopup);
    setNovel(pre=>({...pre,image: imgFromPopup}));
    setIMG(null);
    setOpenPopup('none');
  }

  const editNovel = async (newNovel:Novel<string,string>) => {
    let updateToast = toast.loading('Đang cập nhật thông tin...');
    try {
      if (novelData?._id) {
        await updateNovel(novelData._id,newNovel);
        toast.update(updateToast,{ render: "Cập nhật thành công!", type: "success", isLoading: false, autoClose: 3000 });      
        if (closePopup) setTimeout(closePopup, 500);
      }
    } catch (error) {
      toast.update(updateToast,{ render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 });
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950/20 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">
              {isUpdate ? 'Chỉnh sửa truyện' : 'Thêm truyện mới'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Quản lý nội dung và thông tin tác phẩm</p>
          </div>
          {closePopup && (
            <button onClick={closePopup} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Image Upload */}
            <div className="lg:col-span-4 flex flex-col items-center">
               <div className="w-full aspect-[3/4] relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group bg-slate-100 dark:bg-slate-800/50">
                  { (preShow || novel.image) ? (
                    <Image className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Poster" src={ preShow || novel.image } layout="fill"/>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                       <svg className="w-16 h-16 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                       <span className="text-xs font-bold uppercase tracking-widest">Chưa có ảnh bìa</span>
                    </div>
                  )}
                  <input onChange={handleFile} type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                     <p className="text-white text-[10px] font-bold text-center uppercase tracking-widest">Nhấp để thay đổi ảnh</p>
                  </div>
               </div>
               
               <button 
                  onClick={() => setOpenPopup('images')} 
                  className="mt-6 w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-slate-200 dark:border-slate-700"
               >
                 Thư viện Poster có sẵn
               </button>
            </div>

            {/* Right Column: Form Fields */}
            <div className="lg:col-span-8 space-y-8">
              {isUpdate && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Trạng thái phẩm phẩm</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input name='status' value='continue' onChange={handleInputChange} type="radio" checked={novel.status == 'continue'} className="w-4 h-4 text-primary-600 bg-slate-100 border-slate-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
                      <span className={`text-sm font-bold transition-colors ${novel.status === 'continue' ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`}>Còn tiếp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input name='status' value='completed' onChange={handleInputChange} type="radio" checked={novel.status == 'completed'} className="w-4 h-4 text-green-600 bg-slate-100 border-slate-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" />
                      <span className={`text-sm font-bold transition-colors ${novel.status === 'completed' ? 'text-green-600' : 'text-slate-400 group-hover:text-slate-600'}`}>Hoàn thành</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên tác phẩm</label>
                  <input name="title" value={novel.title || ''} onChange={handleInputChange} type="text" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all font-bold" placeholder="Nhập tên truyện..."/>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thể loại</label>
                  <div className="flex gap-2">
                    <select value={(novel.category as any) || ''} onChange={handleInputChange} name="category" className="flex-1 px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all font-bold appearance-none">
                      <option value="">-- Chọn thể loại --</option>
                      {allCates.isSuccess && allCates.data.map((item,index)=>(
                        <option key={index} value={item._id}>{item.cate}</option>
                      ))}
                    </select>
                    <button onClick={()=>setOpenPopup('createCategory')} className="p-4 bg-slate-100 dark:bg-slate-800 text-primary-500 rounded-2xl hover:bg-primary-500 hover:text-white transition-all">
                      <IoMdAddCircle size={24}/>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tác giả</label>
                <div className="flex gap-2 relative">
                  <div className="flex-1 relative">
                    <input name="author" autoComplete="off" value={ authorSearch || '' } onChange={handleFindAuthor} type="text" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all font-bold" placeholder="Tìm kiếm tác giả..."/>
                    { (authorSearch != '' && novel.author == '') && (
                      <span className='absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-red-500 uppercase bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md'>Không tồn tại</span>
                    )}
                    
                    {authList.length > 0 && (
                      <ul className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-2 max-h-60 overflow-y-auto overflow-x-hidden">
                        {authList.map((item,index)=>(
                          <li key={index} onClick={()=>{
                            setNovel(pre=>({...pre,author: item._id}))
                            setAuthorSearch(item.name);
                            setAuthList([])
                          }} className="w-full px-6 py-3 cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                            <span className="font-bold text-slate-700 dark:text-slate-200">{item.name}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Tác phẩm: {item.novelCount || 0}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button onClick={()=>setOpenPopup('createAuthor')} className="p-4 bg-slate-100 dark:bg-slate-800 text-primary-500 rounded-2xl hover:bg-primary-500 hover:text-white transition-all">
                    <IoMdAddCircle size={24}/>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả tác phẩm</label>
                <textarea name="description" value={novel.description || ''} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all min-h-[160px] resize-none leading-relaxed" placeholder="Tóm tắt ngắn gọn về nội dung truyện..."/>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={addNewPoster} className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl shadow-xl shadow-primary-500/25 transition-all active:scale-95 text-lg">
                  {isUpdate ? 'Cập nhật thông tin' : 'Tạo truyện mới'}
                </button>
                <button onClick={handleReset} className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-black rounded-2xl transition-all hover:bg-slate-200 dark:hover:bg-slate-700">
                  Làm mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {openPopup == 'createAuthor' && (
        <CreateAuthorPopUp showToast={() => {
          toast.success('Tạo tác giả thành công', toastConfig);
          setOpenPopup('none');
        }} closePopup={() => setOpenPopup('none')} />
      )}
      
      {openPopup == 'createCategory' && (
        <CreateCategoryPopup showToast={() => {
          toast.success('Thêm thể loại thành công', toastConfig);
          setOpenPopup('none');
          allCates.refetch();
        }} closePopup={() => setOpenPopup('none')} />
      )}
      
      {openPopup == 'images' && (
        <PosterPopup choonseImage={getImageFromPopup} closePopup={() => setOpenPopup('none')} />
      )}
    </div>
  )
}

export default NovelPage;