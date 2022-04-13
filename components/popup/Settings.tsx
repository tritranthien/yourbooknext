import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getChapsNoLimit } from '../../libs/api/novelAPI'
interface ChapProps{
    closePopup: () => void,
    settingThemse: (thems:{bg:string,color:string})=>void,
    settingFontSize: (fz:string) => void,
    settingFont: (f:string) => void,
    stringFont:string,
    stringSize: string
}
const fontSizes = [
    'text-[16px]',
    'text-[18px]',
    'text-[20px]',
    'text-[22px]',
    'text-[24px]',
    'text-[26px]',
    'text-[28px]',
    'text-[30px]',
]
const fonts = [
    'font-sans',
    'font-serif',
    'font-mono'
]
const colors = [
    {
        bg:'bg-[#FFE5DC]',
        color: 'text-black'
    },
    {
        bg:'bg-[#FFFEDC]',
        color: 'text-black'
    },
    {
        bg:'bg-[#E9FFDC]',
        color: 'text-black'
    },
    {
        bg:'bg-[#DCFFEA]',
        color: 'text-black'
    },
    {
        bg:'bg-[#DEDCFF]',
        color: 'text-black'
    },
    {
        bg:'bg-[#3D3D3D]',
        color: 'text-[#D4D4D4]'
    },
]
const Settings:React.FC<ChapProps> = ({closePopup,settingThemse,settingFont,settingFontSize,stringSize,stringFont}:ChapProps) => {
    // const {data,error,isSuccess} = useQuery(['mysetting'],()=>getChapsNoLimit(novel));
    const router = useRouter();
    
    return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center">
            <div className="relative w-[700px] h-[420px] bg-white px-10">
                <span className="w-full font-bold py-5 block text-xl">settings</span>
                <span onClick={closePopup} className="absolute top-1 right-1 w-[50px] h-[50px] block text-[30px] cursor-pointer"><FaWindowClose/></span>
                <span className="font-bold block mb-2">màu nền</span>
                <div className="flex">
                    {
                        colors.map((color, index) =>{
                            return <span key={index} onClick={()=>settingThemse(color)} className={`cursor-pointer ml-4 w-10 h-10 rounded-full bottom-1 text-center leading-10 ${color.bg} ${color.color}`}>A</span>
                        })
                    }
                    
                </div>
                <span className={`flex items-center h-16 px-3 py-1 ${stringSize} ${stringFont}`}>đây là văn bản mẫu</span>
                <span className="font-bold my-2 block">font chữ</span>
                    <div className="flex items-center">
                        {
                            
                            fonts.map((font,index)=>{
                                return <span key={index} onClick={()=>settingFont(font)} className={`cursor-pointer ml-4 px-3 py-1 rounded-md text-center leading-10 bg-gray-200 ${font}`}>{font}</span>
                            })
                        }
                    </div>
                    <span className="font-bold block my-2">cỡ chữ</span>
                    <div className="flex items-center">
                        {
                            
                            fontSizes.map((size,index)=>{
                                return <span key={index} onClick={()=>settingFontSize(size)} className={`cursor-pointer ml-4 w-10 h-10 rounded-full bottom-1 text-center leading-10 bg-gray-200 ${size}`}>Aa</span>
                            })
                        }
                    </div>
            </div>
            
        </div>
  )
}

export default Settings