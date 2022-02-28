import Image from 'next/image';
import React from 'react';
import { Novel } from '../../interface/_Novel';

const TopNovels: React.FC = () => {
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
            image: "images/tt1.jpg",
            chap: 123,
            category: 'kỳ huyễn'
        },
        {
            auth: "Trí Chung",
            title: "Ma đạo khuynh thiên",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt2.jpg",
            chap: 22,
            category: 'võ hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt3.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Phần thiên",
            title: "Cô huyết phong lưu",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt4.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Phi Duyên",
            title: "Ngã cảnh vi thuận",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt5.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt6.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt7.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
        {
            auth: "Trí đại thần",
            title: "Dân lập trình xuyên không thành tuyệt thế trận pháp sư",
            des: "Gầy yếu như ta thì làm sao tồn tại được ở thế giới mà tu giả vi tôn, người người như sâu kiến....",
            image: "images/tt8.jpg",
            chap: 123,
            category: 'tiên hiệp'
        },
    ]
  return <div className='w-full px-0'>
      <span className='text-sky-600 text-xl py-2 font-bold border-b-2 w-full block'>Top truyện đề cử</span>
      <div className="flex w-full gap-3 py-2">
        <div className="flex flex-col w-1/4 h-[336px] pt-2">
            <Image src={`/${recomenedList[0].image}`} width={300} height={192}/>
            <span className="text-xl line-clamp-2 px-2 py-1 font-medium text-gray-600 ">{recomenedList[0].title}</span>
            <div className="flex w-full ">
                <span className="text-gray-500 text-xs px-2 mb-1">{recomenedList[0].category}</span>
                <span className="text-blue-500 text-xs px-2 mb-1">{`${recomenedList[0].chap} chương`}</span>
            </div>
            <span className="text-orange-700 px-2 mb-1">{recomenedList[0].auth}</span>
            <p className="text-sm line-clamp-2 px-2 mb-4">{recomenedList[0].des}</p>
        </div>
        <div className="flex w-3/4 flex-wrap">
            {
                recomenedList.map((item,index)=>{
                    return <div className='w-1/3 h-1/3 p-2 flex items-center' key={index}>
                        <div className="flex w-full">
                            <div className="w-[80px] h-[90px] relative">
                                <Image src = {`/${item.image}`} className='absolute object-cover' layout='fill'/>
                            </div>
                            <div className="w-[calc(100%_-_80px)] mx-2">
                                <span className="w-full line-clamp-2 text-base h-12 font-medium text-gray-600">{item.title}</span>
                                <span className="w-full text-sm text-orange-700">{item.auth}</span>
                                <div className="flex w-full justify-between text-xs ">
                                    <span className="text-gray-500">{item.category}</span>
                                    <span className="text-blue-500">{`${item.chap} chương`}</span>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                })
            }
        </div>
      </div>
  </div>;
};

export default TopNovels;
