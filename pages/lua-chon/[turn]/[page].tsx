import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import UserBookCard from '../../../components/Card/UserBookCard'
import { SerVerNovel } from '../../../interface/_Novel'
import { getByTurn } from '../../../libs/api/novelAPI'
interface ContextProps{
    params:{
        turn: string,page:number
    }
}
interface TurnProps{
    novels: SerVerNovel[],
    heading:string,
    page:number,
    turn:string,
    total:number
}
const Turn:React.FC<TurnProps> = ({novels,heading,turn,page,total}:TurnProps) => {
    const [novelList,setList] = useState<SerVerNovel[]>(novels);
    const [forcePage,setForcePage] = useState(page);
    // const [page,setPage] = useState(1);
    const route = useRouter();
    // const { error,isSuccess,refetch } = useQuery(['turn',page,turn],()=>getByTurn(turn,page),{
    //     enabled:false,
    //     onSuccess:data=>{
    //         setList([...data.novels]);
    //         if(data.total <= 15){
    //             setPage(1);
    //         }
    //     }
    // })
    // useEffect(()=>{
    //     refetch();
    //     window.scrollTo(0, 0);
    // },[page,turn])
  
  return (
    <div className="w-full bg-gray-100">
        <div className="relative w-full h-48 bg-black">
            <Image layout="fill" objectFit='cover' alt="top novels" src={novels.length > 0 ? novels[0].image : '/images/tt2.jpg'}/>
            <span className="absolute top-0 left-0 w-full h-full text-2xl uppercase bg-black/70 flex justify-center items-center font-bold text-white">{heading}</span>
        </div>
        <div className="container flex justify-center p-5">
        <div className="flex flex-wrap w-full justify-center gap-4">
            {
                novels.map((item,index)=>{
                    return <div className="w-[230px] h-[320px]" key={index}>
                        <UserBookCard novel={item}/>
                    </div>
                })
            }
            {
                novels.length == 0 && <span className="font-bold text-xl"><i>chưa có {heading}, vui lòng quay lại <Link passHref href='/'><a className='text-sky-500'>trang chủ</a></Link> để kiếm truyện khác</i></span>
            }
            {
                    total > 15 && <ReactPaginate
                    className="flex w-full justify-center my-4"
                    pageClassName='w-7 h-7 text-center leading-7 text-black bg-white border border-width-[1px] border-white border-[1px] border-gray-300 -ml-[1px] '
                    breakLabel="..."
                    breakClassName='w-7 h-7 text-center leading-7 text-black bg-white border-[1px] border-white border-2 border-gray-300 -ml-[1px]'
                    previousClassName="w-7 h-7 text-center leading-7 text-black bg-white border-[1px] border-white border-2 border-gray-300 -ml-[1px]"
                    nextClassName="w-7 h-7 text-center leading-7 text-black bg-white border-[1px] border-gray-300 -ml-[1px]"
                    activeClassName="bg-orange-300"
                    activeLinkClassName='font-bold'
                    pageLinkClassName="text-orange-200"
                    nextLabel=">"
                    hrefBuilder={page=>`/lua-chon/${turn}/${page}`}
                    forcePage={page-1}
                    onPageChange={select=>route.push(`/lua-chon/${turn}/${select.selected+1}`)}
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(total/15)}
                    previousLabel="<"
                    selectedPageRel={null}
                    // renderOnZeroPageCount={null}
                />
                }
        </div>
    </div>
    </div>
  )
}
export const getServerSideProps = async ({params}:ContextProps) => {
    const {turn,page} = params;
    let heading = 'lựa chọn';
    const novelData = await getByTurn(turn,page);
    switch (turn) {
        case 'moi-nhat':
            heading = 'truyện mới nhất'
            break;
        case 'hoan-thanh':
            heading = 'truyện đã hoàn thành'
            break;
        case 'truyen-hot':
            heading = 'truyện đang hot'
            break;
        default: heading = 'truyện của bạn'
            break;
    }
    return {
        props:{
            novels:novelData.novels,
            total: novelData.total,
            heading,
            page,
            turn

        }
    }
}

export default Turn