import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRates } from '../../customHooks/reactQuery/Rates';
import { SerVerNovel } from '../../interface/_Novel';
import { rated, SendMyRate } from '../../libs/api/novelAPI';
import RateContent from './RateContent';
interface RateProps{
  novel: SerVerNovel,
  loged: boolean,
}
const Ratting:React.FC<RateProps> = ({novel,loged}: RateProps) => {
  const [rate,setRate] = useState(0);
  const [content,setContent] = useState('');
  const [myrated,setMyRated] = useState(false);
  const { data, isSuccess, error,refetch } = useRates(novel._id);
  const resetdata = () => {
    setContent('');
    setRate(0);
  }
  const sendRate = async () => {
    const MyRate = {
      novel: novel._id,
      content: content,
      scores: rate
    }
    const idToast = toast.loading('đang gửi đánh giá');
    try {
      const res = await SendMyRate(MyRate);
      if(res.success){
        toast.update(idToast,{ render: "gửi thành công", type: "success", isLoading: false, autoClose: 5000 });
        setMyRated(true);
        refetch();
      }
      resetdata();
    } catch (error) {
      toast.update(idToast,{ render: "gửi thất bại", type: "error", isLoading: false, autoClose: 5000 });

    }
  }
  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }
  useLayoutEffect(()=>{
    if(loged){
      const checkRated = async (id:string) => {
        try {
          const res = await rated(id);
          console.log(res);
          if(res.data.rated){
            setMyRated(true);
          }
        } catch (error) {
          
        }
      }
      checkRated(novel._id);
    }
  },[])
  return <div className='w-full p-10'>
    { 
      loged ? 
      ( myrated ? <p className='p-5'><i>bạn đã đánh giá truyện này rồi</i></p> : 
       <div className='w-full'>
      <span className="font-medium text-2xl w-full">VIẾT ĐÁNH GIÁ</span>
      <textarea value={content || ''} onBlur={handleChange} onChange={handleChange} className="w-full outline-none border-2 h-28 p-2"/>
      <Rating 
          initialRating={rate}
          onChange={(num)=>setRate(num)}
          fullSymbol={<AiFillStar size={25} color={'yellow'}/>}
          emptySymbol={<AiOutlineStar size={25} color={'yellow'}/>}
        />
        <br/>
      <button onClick={sendRate} className="px-3 py-1 rounded-sm text-white bg-blue-700">Đăng</button>
    </div>)
    :
    <p className='p-5'><i>bạn phải đăng nhập mới có thể đánh giá truyện</i></p>
    }
    { isSuccess && data.map((item,index)=>{
      return <RateContent rate={item} key={index}/>
    }) }
  </div>;
};

export default Ratting;
