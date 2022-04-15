import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import VerticalCard from '../../../components/Card/VerticalCard'
import { SerVerNovel } from '../../../interface/_Novel'
import { getBySlug } from '../../../libs/api/category'
import { filterInCate, novelsBycate } from '../../../libs/api/novelAPI'
interface contextProps{ 
	params : { 
		cate : string 
	} 
} 
interface AllPageProps{
    novels: SerVerNovel[],
    total: number,
    cateName: string,
    cateId: string,
}
const All:React.FC<AllPageProps> = ({novels,cateName,cateId,total}:AllPageProps) => {
    console.log(novels);
    const [statusNovel,setStatusNovel] = useState('all');
    const [totalFull,setTotal] = useState(total);
    const [page,setPage] = useState(1);
    const [chapNumNovel,setchapNumNovel] = useState(0);
    const [sortNovel,setsortNovel] = useState<'updatedAt' | 'views' | 'likes'>('updatedAt');
    const [novelList,setNovelList] = useState<SerVerNovel[]>(novels);
    const { error,isSuccess,refetch } = useQuery(['novelsInCate',statusNovel,cateName,chapNumNovel,sortNovel,page],()=>filterInCate(cateId,page,statusNovel,chapNumNovel,sortNovel),{
        enabled: false,
        onSuccess: data=>{
            setNovelList([...data.novels]);
            setTotal(data.total);
            if(data.total <= 15){
                setPage(1);
            }
        }
    })
    const setStt = async (value:string) => {
        setStatusNovel(value);
        refetch();
    }
    const setChap = async (value:number) => {
        setchapNumNovel(value);
        refetch();
    }
    const setSort = async (value:'updatedAt' | 'views' | 'likes') => {
        setsortNovel(value);
        refetch();
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[statusNovel,chapNumNovel,sortNovel,page])

  return (
    <div className="">
        <div className="w-full h-40 relative">
            {
                novels.length > 0 && <Image objectFit='cover' alt="tong hop top" src={novels[0].image} layout="fill"/>
            }
           <span className="absolute text-3xl uppercase font-bold flex justify-center items-center text-white w-full h-full bg-black/70">{`truyện ${cateName}`}</span>
        </div>
        <div className="container flex flex-nowrap">
            <div className=" w-1/4 p-2">
                <div className='sticky top-0'>
                    <span className="font-bold w-full block mb-2">Tình trạng</span>
                    <button onClick={()=>setStt('all')} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${statusNovel == 'all' && `bg-orange-300`}`}>tất cả</button>
                    <button onClick={()=>setStt('continue')} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${statusNovel == 'continue' && `bg-orange-300`}`}>đang ra</button>
                    <button onClick={()=>setStt('completed')} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${statusNovel == 'completed' && `bg-orange-300`}`}>hoàn thành</button>
                    <span className="font-bold w-full block mt-5 mb-2">Số chương</span>
                    <button onClick={()=>setChap(0)} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${chapNumNovel == 0 && `bg-orange-300`}`}>tất cả</button>
                    <button onClick={()=>setChap(300)} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${chapNumNovel == 300 && `bg-orange-300`}`}>{`< 300`}</button>
                    <button onClick={()=>setChap(1000)} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${chapNumNovel == 1000 && `bg-orange-300`}`}>{`300-1000`}</button>
                    <button onClick={()=>setChap(2000)} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${chapNumNovel == 2000 && `bg-orange-300`}`}>{`1000-2000`}</button>
                    <button onClick={()=>setChap(2001)} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${chapNumNovel == 2001 && `bg-orange-300`}`}>{`> 2000`}</button>
                    <span className="font-bold w-full block mt-5 mb-2">Sắp xếp</span>
                    <button onClick={()=>setSort('updatedAt')} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${sortNovel === 'updatedAt' && `bg-orange-300`}`}>vừa cập nhật</button>
                    <button onClick={()=>setSort('likes')} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${sortNovel === 'likes' && `bg-orange-300`}`}>yêu thích</button>
                    <button onClick={()=>setSort('views')} className={`border-2 border-orange-200 py-1 px-3 mr-1 mb-1 rounded-md ${sortNovel === 'views' && `bg-orange-300`}`}>xem nhiều</button>
                    
                </div>
                
            </div>
                
            
            <div className="w-3/4">
                {
                    novelList.map((item, index)=>{
                        return <VerticalCard key={index} novel={item}/>
                    })
                }
                {
                    novelList.length <= 0 && <span className="font-bold block p-4 text-2xl"><i>không tìm thấy truyện đủ điều kiện</i></span>
                }
                {
                    totalFull > 15 && <ReactPaginate
                    className="flex w-full justify-center my-4"
                    pageClassName='w-7 h-7 text-center leading-7 text-black bg-white border border-width-[1px] border-white border-[1px] border-gray-300 -ml-[1px] '
                    breakLabel="..."
                    breakClassName='w-7 h-7 text-center leading-7 text-black bg-white border-[1px] border-white border-2 border-gray-300 -ml-[1px]'
                    previousClassName="w-7 h-7 text-center leading-7 text-black bg-white border-[1px] border-white border-2 border-gray-300 -ml-[1px]"
                    nextClassName="w-7 h-7 text-center leading-7 text-black bg-white border-[1px] border-gray-300 -ml-[1px]"
                    activeClassName="bg-orange-300"
                    pageLinkClassName="text-orange-200"
                    nextLabel=">"
                    onPageChange={select=>setPage(select.selected + 1)}
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(totalFull/15)}
                    previousLabel="<"
                    // renderOnZeroPageCount={null}
                />
                }
            </div>
        </div>
    </div>
  )
}
export const getServerSideProps = async ({params}:contextProps) => {
    const { cate } = params;
    const myCate = await getBySlug(cate);
    const novels = await novelsBycate(myCate._id);
    if(myCate && novels){
        return {
            props: {
                novels: novels.novels,
                total: novels.total,
                cateName: myCate.cate,
                cateId: myCate._id,
            }
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/page404"
        },
        props:{}
    }
    
}
export default All