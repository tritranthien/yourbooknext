import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import TopNovels from '../../../components/TopNovels/TopNovels'
import { SerVerNovel } from '../../../interface/_Novel'
import { getAllCates, getBySlug } from '../../../libs/api/category'
import { bestViewsInCate, novelsBycate, novelsCompletedByCate } from '../../../libs/api/novelAPI'

interface contextProps{ 
	params : { 
		cate : string,
    cate_id: string
	} 
} 
interface TpageProps{
  novelsUpdated: SerVerNovel[],
  novelsCompleted: SerVerNovel[],
  novelsBestViews: SerVerNovel[],
  cateName: string,

}
const Tpage:React.FC<TpageProps> = ({novelsUpdated,novelsCompleted,novelsBestViews,cateName}:TpageProps) => {
  const router = useRouter();
  const { cate } = router.query;
  return (
    <div className="w-full">
      <div className="relative w-full h-48">
        <Image layout='fill' alt="tong hop top 1" src={novelsUpdated.length > 0 ? novelsUpdated[0].image : '/images/tt3.jpg'} objectFit='cover'/>
        <span className="absolute top-0 left-0 w-full h-full bg-black/70 text-2xl font-bold flex justify-center items-center uppercase text-white">{cateName}</span>
      </div>
      <div className="container py-2">
      <span className="font-bold text-xl text-sky-600">{`Truyện ${cateName} vừa cập nhật`}</span>
      <div className="flex w-full flex-wrap md:flex-nowrap">
        <ul className="text-sm w-full mb-4 md:mb-0 md:w-3/5 lg:w-4/5 py-2 md:pr-4">
          { 
              novelsUpdated.length > 0 ?
              novelsUpdated.map((item, index)=>{
                  return <li key={index} className='text-gray-400 w-full flex justify-between items-center py-2 border-b-[1px]'> 
                      <span className='first-letter:uppercase one-line-hidden hidden  lg:block w-20'>{item.category.cate}</span>
                      <span className='capitalize text-gray-800 ml-3 min-w-[120px] one-line-hidden w-11/12 lg:w-[calc(100%_-_400px)]'><Link passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link></span>
                      <span className='text-xs w-[120px] ml-3 one-line-hidden hidden lg:block'><Link passHref href={`/tac-gia/${item.author.slug}`}><a>{item.author.name}</a></Link></span>
                      <span className='text-xs w-[100px] ml-3 one-line-hidden'><Link passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}><a>{`Chương ${item.chapCount}`}</a></Link></span>
                      <span className='text-xs md:w-[100px] ml-3 one-line-hidden hidden w-1/12 lg:block'>{format(parseISO(item.updatedAt),'yyyy-MM-dd')}</span>
                  </li>
              })
              :
              <span className="font-bold">Thể loại này chưa có truyện nào được đăng cả :( hãy quay lại <i className='text-sky-500'><Link passHref href='/'><a>trang chủ</a></Link></i> tìm truyện khác</span>
          }
          { novelsUpdated.length > 0 && <button onClick={()=>router.push(`/tonghop/${cate}/all`)} className='text-2xl w-full py-1 px-2 block bg-sky-500 text-white mb-2'>xem đầy đủ</button>}
        </ul>
        <div className="w-full mb-4 md:mb-0 md:2/5 lg:w-1/4 ">
          
            {
              novelsBestViews.length > 0 && <>
              <span className="font-bold block mb-2"><i>{`Truyện ${cateName} xem nhiều`}</i></span>
              <Link passHref href={`/truyen/${novelsBestViews[0].slug}`}><a>
              <div className="w-full relative text-sm">
                <div className="relative w-full h-[220px] md:h-[280px]">
                <Image layout="fill" objectFit='cover' alt={novelsBestViews[0].title} src={novelsBestViews[0].image}/>

                </div>
              <span className="absolute top-2 left-2 rounded-full block w-6 h-6 text-center leading-6 text-white bg-green-500">1</span>
              <span className="absolute top-2 right-2 rounded-md block px-3 py-1 text-white bg-violet-700">{`Chương ${novelsBestViews[0].chapCount}`}</span>
              <div className="absolute bottom-3 left-2 right-2 bg-white py-1">
                <span className="block px-3 w-full line-clamp-2">{novelsBestViews[0].title}</span>
                <span className='text-orange-700 px-3'>{novelsBestViews[0].author.name}</span>

              </div>
              
            </div>
            </a></Link>
            {
              novelsBestViews.map((item,index)=>{
                if (index == 0) {
                  return
                }
                return <div key={index} className="w-full mt-2 flex flex-nowrap text-sm">
                <span className="block w-6 h-6 text-center leading-6 text-white bg-green-300 rounded-full">{index+1}</span>
                <span className="px-2 line-clamp-1 w-[calc(100%_-_55px)]"><Link passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link></span>
                <span className="px-2 w-[25px]"><Link passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}><a>{`C.${item.chapCount}`}</a></Link></span>
              </div>
              })
            }
            
              </>
            }
        </div>
        
      </div>
      {
        novelsCompleted.length > 0 ? <TopNovels title={`Truyện ${cateName} hoàn thành`} novels={novelsCompleted || []}/>
        :
        <span className="font-bold"><i>{`chưa có truyện ${cateName} nào hoàn thành cả, hic hic`}</i></span>
      }
      
    </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const cates = await getAllCates();
    const paths = cates.map(item=>({
      params: {cate: item.slug},
    }))
    return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({params}:contextProps) => {
  const { cate } = params;
  const myCate = await getBySlug(cate);
  const novelsUpdated = await novelsBycate(myCate._id);
  const novelsCompleted = await novelsCompletedByCate(myCate._id);
  const novelsBestViews = await bestViewsInCate(myCate._id);
  return {
    props: {
      novelsUpdated: novelsUpdated.novels,
      novelsCompleted,
      novelsBestViews,
      cateName: myCate.cate,
    },
    revalidate: 600,
  }
}

export default Tpage