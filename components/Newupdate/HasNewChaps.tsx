import React from 'react';
import { Novel } from '../../interface/_Novel';

const HasNewChaps:React.FC = () => {
    const recomenedList: Novel[] = [
        {
            auth: "Trần như mộng",
            title: "Hoa vô khuyết",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'kiếm hiệp'
        },
        {
            auth: "Ngô diễn",
            title: "Phi Thiên Đạo",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'kỳ huyễn'
        },
        {
            auth: "Trí Chung",
            title: "Ma đạo khuynh thiên",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 22,
            category: 'võ hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Phần thiên",
            title: "Cô huyết phong lưu",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Phi Duyên",
            title: "Ngã cảnh vi thuận",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Ngu huyên",
            title: "Thiên mệnh chi duy ngã độc tôn",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Tà long thuật",
            title: "Ngã vi phong chi",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Lão Thất",
            title: "chuyên đánh chó",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'đô thị'
        },
        {
            auth: "Lãnh tú",
            title: "Ngộ nhập động quật, ta đi tới thế giới mới",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'mạt thế'
        },
        {
            auth: "Thần Niên",
            title: "Vô kỵ thiên khung",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
    ]
  return <div className='flex w-full'>
      <div className="w-3/4">
      <span className='text-sky-600 text-xl py-2 font-bold border-b-2 w-full block'>Truyện mới cập nhật</span>
      
      <ul className="text-sm w-full">
        {
            recomenedList.map((item, index)=>{
                return <li key={index} className='text-gray-400 w-full flex justify-between items-center py-2 border-b-[1px]'> 
                    <span className='first-letter:uppercase one-line-hidden w-20'>{item.category}</span>
                    <span className='capitalize text-gray-800 ml-3 min-w-[120px] one-line-hidden w-[calc(100%_-_400px)]'>{item.title}</span>
                    <span className='text-xs w-[120px] ml-3 one-line-hidden'>{item.auth}</span>
                    <span className='text-xs w-[100px] ml-3 one-line-hidden'>{`Chương ${item.chap}`}</span>
                    <span className='text-xs w-[100px] ml-3 one-line-hidden'>10:05 15/01</span>
                </li>
            })
        }
      </ul>
      </div>
        <div className="w-1/4 h-[500px]">
            <span className='text-sky-600 text-xl py-2 font-bold border-b-2 w-full block'>Truyện mới</span>
            <ul className='text-sm tracking-tight leading-5'>
                {
                    recomenedList.map((item,index)=>{
                       return <li className="w-full flex flex-nowrap p-2 h-[37px]" key={index}>
                           <span className='w-3/4 text-gray-800 one-line-hidden'>{item.title}</span>
                           <span className='w-1/4 text-zinc-400 one-line-hidden'>{item.category}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    
</div>;
};

export default HasNewChaps;
