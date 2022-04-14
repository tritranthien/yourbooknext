import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { IoIosArrowBack, IoIosSettings } from 'react-icons/io';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Chaplist from '../../../../components/popup/Chaplist';
import Settings from '../../../../components/popup/Settings';
import { SerVerChap } from '../../../../interface/_Chap';
import { getChap } from '../../../../libs/api/novelAPI';
interface SSGProps{
    params:{
        chap:number,
        slug:string
    }
}
interface SSRRES{
    thisChap: SerVerChap,
    slug: string,
}

const index:React.FC<SSRRES> = ({slug,thisChap}:SSRRES) => {
    const router = useRouter();
    const [show,setShow] = useState<number>(-1);
    const [fontSize,setFontSize] = useState('text-[20px]');
    const [stringFont,setStringFont] = useState('');
    const [themse,setThemse] = useState({
        bg: 'bg-white',
        color: 'text-black'
    });
    const settingThemse = (themse:{bg: string, color:string}) => {
        setThemse(themse);
    }
    const settingFontSize = (fontsize: string) => {
        setFontSize(fontsize);
    }
    const settingFont = (font:string)=>{
        setStringFont(font);
    }
    return <div className={`w-full ${themse.bg} ${themse.color}` }>
        
        <div className="container">
        <div className="flex border-b-orange-600-600 justify-between text-blue-500">
            <Link passHref href={`/truyen/${slug}`}><a><span className="flex items-center h-11 font-bold text-gray-900"><IoIosArrowBack />{thisChap.novel.title}</span></a></Link>
        </div>
            <div className="w-full flex flex-col py-5 px-10 ">
                <span className="text-3xl font-bold uppercase">{thisChap.novel.title}</span>
                <span className="text-xl text-blue-500">{`chương ${thisChap.chap}: ${thisChap.title}`}</span>
                <span className="text-xl text-blue-500">{ `người đăng: ${thisChap.poster?.username}` }</span>
                <span className="text-xl text-blue-500">{ `đăng ngày: ${format(parseISO(thisChap.updatedAt),'yyyy-MM-dd')}` } </span>
            </div>
            <span className=' flex px-10 w-full justify-center'>
                <button 
                disabled={thisChap.chap <= 1} 
                onClick={()=>{ router.push(`/truyen/${slug}/${thisChap.chap - 1}`)}} 
                className="flex justify-center items-center w-8 h-8 leading-8 text-center cursor-pointer bg-blue-700 text-white rounded-sm disabled:opacity-70">
                    <MdArrowBackIosNew />
                </button>

                <button 
                disabled={ thisChap.chap == thisChap.novel.chapCount}
                onClick={()=>{ router.push(`/truyen/${slug}/${thisChap.chap + 1}`)}}
                className="flex text- justify-center items-center ml-2 w-8 h-8 leading-8 text-center cursor-pointer bg-blue-700 text-white rounded-sm disabled:opacity-70">
                    <MdArrowForwardIos />
                </button>
                
                
            </span>
            <div className="flex w-full justify-center">
                <p className={`w-[800px] py-5 px-5 whitespace-pre-wrap self-center ${fontSize} ${stringFont}`}>
                    { thisChap.content }
                </p>
            </div>
            <span className=' flex px-10 w-full justify-center mb-10'>
                <button 
                disabled={thisChap.chap <= 1} 
                onClick={()=>{ router.push(`/truyen/${slug}/${thisChap.chap - 1}`)}} 
                className="flex justify-center items-center w-8 h-8 leading-8 text-center cursor-pointer bg-blue-700 text-white rounded-sm disabled:opacity-70">
                    <MdArrowBackIosNew />
                </button>

                <button 
                disabled={ thisChap.chap == thisChap.novel.chapCount}
                onClick={()=>{ router.push(`/truyen/${slug}/${thisChap.chap + 1}`)}}
                className="flex justify-center items-center mb-5 ml-2 w-8 h-8 leading-8 text-center cursor-pointer bg-blue-700 text-white rounded-sm disabled:opacity-70">
                    <MdArrowForwardIos />
                </button>
                
                
            </span>
        </div>
        <div className="w-[40px] fixed left-0 top-1/2 translate-y-[-50%] cursor-pointer">
            <span onClick={()=>setShow(0)} className="flex justify-center items-center w-[40px] h-[40px] text-xl opacity-70"><AiOutlineUnorderedList/></span>
            <span onClick={()=>setShow(1)} className="flex justify-center items-center w-[40px] h-[40px] text-xl opacity-70"><IoIosSettings/></span>
            <span className="flex justify-center items-center w-[40px] h-[40px] text-xl opacity-70"><FaComment/></span>
        </div>
        { show == 0 && <Chaplist slug={slug} novel={thisChap.novel._id} closePopup={()=>setShow(-1)}/>}
        { show == 1 && <Settings settingFont={settingFont} stringFont={stringFont} stringSize={fontSize} settingFontSize={settingFontSize} settingThemse={settingThemse} closePopup={()=>setShow(-1)}/>}

        
  </div>;
};

export const getServerSideProps = async ({params}: SSGProps) => {
    const { slug,chap } = params;
    const thisChap = await getChap(slug,chap);
    if (!thisChap._id) {
        return {
            redirect: {
                permanent: false,
                destination: "/page404",
            },
            props:{}
        }
    }
    return {
        props:{
            slug,
            thisChap
        }
    }
}

export default index;
