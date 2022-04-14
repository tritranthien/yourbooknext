import Image from 'next/image';
import React,{useState} from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { useQuery } from 'react-query';
import { getPosters } from '../../libs/api/uploadFile';
interface PopUpProps{
  choonseImage:(img: string)=>void,
  closePopup: ()=>void
}

const PosterPopup:React.FC<PopUpProps> = ({closePopup,choonseImage} : PopUpProps) => {
  
  const [imageList,setImageList] = useState<string[]>([]);
  const [nx_cursor,setNext_cursor] = useState('');
  const { data, error, isSuccess } = useQuery('firstLoadPoster',()=>getPosters(),{onSuccess:data=>{
    setImageList(data.resources);
    if(data.next_cursor){
      setNext_cursor(data.next_cursor);
    } else {
      setNext_cursor('');
    }
  }});
  const morePoster = async () => {
    try {
      const moreImages = await getPosters(nx_cursor);
      setImageList(pre=>[...pre,...moreImages.resources]);
      setNext_cursor(moreImages.next_cursor);
    } catch (error) {
      alert('loi')
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/10'>
            <div className="px-5 py-3 flex flex-col items-center w-[870px] h-[460px] bg-white shadow-md relative ">
                <AiFillCloseSquare onClick={closePopup} className=' text-red-600 text-4xl absolute top-0 right-0 cursor-pointer' />
                <span className="text-xl font-bold">Chọn poster</span>
    
                <div className="flex flex-wrap gap-1 overflow-y-auto">
                    {
                      imageList?.map((item,index)=>{
                        return <div onClick={()=>choonseImage(item)} key={index} className="relative w-[200px] h-[200px] cursor-pointer">
                          <Image className="object-cover" src={item} alt={item} layout='fill'/>
                        </div>
                      })
                    }
                    { nx_cursor && nx_cursor != '' && <button onClick={()=>morePoster()} className="text-blue-500 text-2xl mx-3">xem thêm</button>}
                </div>
        </div>
    </div>
  )
}

export default PosterPopup;