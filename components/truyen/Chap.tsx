import React, { useEffect, useState } from 'react';
import { useChaps } from '../../customHooks/reactQuery/Chap';
import ReactPaginate from 'react-paginate';
import { SerVerNovel } from '../../interface/_Novel';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
const Chap:React.FC<{novel:SerVerNovel}> = ({novel}:{novel:SerVerNovel}) => {
  const router = useRouter();
  const path = router.asPath;
  const [mychaps, setMychaps] = useState([]);
  const [page,setPage] = useState(1);
  const chaps = useChaps(novel._id,page);
  const handlePageChange = (event:{selected:number}) => {
    setPage(event.selected+1);
  }
  useEffect(()=>{
    chaps.refetch();
  },[page,novel])
  // if(chaps.isFetching){
  //   return <span className="w-full text-center px-3 py-1 font bold">loadding...</span>
  // }
  return <div>
    { 
      novel.chapCount > 50 && 
      <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageChange}
      pageRangeDisplayed={50}
      className="flex"
      activeClassName="font-bold text-blue-900"
      pageClassName='text-white bg-blue-400 w-7 h-7 leading-7 text-center border border-white'
      previousClassName="bg-blue-100 w-7 h-7 leading-7 text-center border border-white text-blue-400"
      nextClassName=" bg-blue-100 w-7 h-7 leading-7 text-center border border-white text-blue-400"
      pageCount={Math.ceil(novel.chapCount/50)}
      previousLabel="<"
    />
    }
      
    <table className="list-none w-full md:mt-5">
      <thead className="hidden md:block">
      <tr className="">
              <th className="py-1 px-2 text-gray-600 font-bold text-left hidden md:block">STT</th>
              <th className="py-1 px-1 md:px-2 text-gray-600 font-bold text-left">Chương</th>
              <th className="py-1 px-1 md:px-2 text-gray-600 font-bold text-left truncate">Tiêu đề chương</th>
              <th className="py-1 px-2 text-gray-600 font-bold text-left hidden md:block">ngày đăng</th>
          </tr>
      </thead>
          <tbody>
          { 
        chaps.isSuccess && chaps.data.map((item,index)=>{
          return <tr className="" key={index}>
            <td className="py-1 px-2 text-gray-400 hidden md:block">{index+1}</td>
            <td className="py-1 px-1 md:px-2 text-gray-400 "><Link passHref href={`${path}/${item.chap}`}><a>{`Ch.${item.chap}`}</a></Link></td>
            <td className="py-1 px-1 md:px-2 text-blue-500 line-clamp-1"><Link passHref href={`${path}/${item.chap}`}><a>{item.title}</a></Link></td>
            <td className="py-1 px-2 text-blue-500 hidden md:block">{format(parseISO(item.updatedAt),'yyyy-MM-dd')}</td>
          </tr>
        })
      }
          </tbody>
      
    </table>
  </div>;
};

export default Chap;
