import React, { ReactElement, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import UserBookCard from '../../components/Card/UserBookCard';
import AddNewChapPopup from '../../components/popup/AddNewChapPopup';
import EditNovelPopup from '../../components/popup/EditNovelPopup';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { Author } from '../../interface/_Author';
import { Category } from '../../interface/_Category';
import { Novel, SerVerNovel } from '../../interface/_Novel';
import { getAllNovels } from '../../libs/api/novelAPI';

const Userdata = () => {
    const novels = useQuery('allNovels',()=>getAllNovels());
    const [novelUpdating,setNovelUpdating] = useState<Novel<Author,Category> | null>(null);
    const [currentNovel,setCurrentNovel] = useState<SerVerNovel | null>(null);
    return (
        <div className="w-full min-h-screen z-40">
          <span className="block px-5 py-3 text-2xl font-bold">Truyện đã đăng</span>
            <div className="flex flex-wrap gap-4 p-5">
              {
                novels.isSuccess && novels.data.length <= 0 && <p className='p-2'><i>bạn chưa đăng tải truyện nào lên cả, đồ lười!!!</i></p>
              }
            {
              novels.isSuccess && novels.data.map((item,index)=>{
                return <div key={index} className="group w-[220px] h-[320px] relative">
                  <UserBookCard novel={item}/>
                  <div className="group-hover:flex absolute top-4 right-4 hidden p-2 text-3xl cursor-pointer rounded-md bg-white opacity-80">
                    <MdOutlineEditNote className="hover:text-blue-500" onClick={()=>setNovelUpdating(item)}/>  
                    <AiOutlineFileAdd className="hover:text-blue-500" onClick={()=>setCurrentNovel(item)}/>
                    
                  </div>
                </div>
              })
            }
            </div>
            {
              novelUpdating && <EditNovelPopup closeUpdate={()=>{
                  setNovelUpdating(null)
                  novels.refetch();
                }
              } 
              novel={novelUpdating}/>
            }

            {
              currentNovel && <AddNewChapPopup closeChap={()=>setCurrentNovel(null)} novel={currentNovel}/>
            }
            {/* <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              draggable
              pauseOnFocusLoss={false}
        /> */}
        </div>
    )
}

Userdata.displayName = 'Userdata';

Userdata.getLayout = function getLayout(page: ReactElement) {
    return (
      <USDBlayout>
        {page}
      </USDBlayout>
    )
  }

export default Userdata;