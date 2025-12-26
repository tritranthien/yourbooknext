import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Autoplay, EffectCube, Pagination } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Maincomponent } from '../../interface/_Maincomponent';
import BookCover3D from '../BookCover3D';

const EditorRecomenedContent: React.FC<Maincomponent> = ({ data }: Maincomponent) => {
  const displayData = data.slice(0, 7);
  const [show, setShow] = useState(0)
  const [isPaused, setIsPaused] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setShow((prev) => (prev + 1) % displayData.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [displayData.length, isPaused]);

  return <div className="flex flex-col w-full border border-slate-100 dark:border-slate-800/50 p-4 rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm transition-colors duration-300">
    <div
      className="flex flex-wrap md:flex-nowrap w-full gap-6 md:items-stretch"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ul className="w-full text-[13px] md:w-[250px] flex flex-col gap-y-1 justify-start py-2 mt-4 md:mt-0 overflow-y-auto custom-scrollbar pr-1 order-2 md:order-1">
        <div className="mb-2 px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiếp theo</span>
        </div>
        {
          displayData.map((item, index) => {
            return (
              <li
                key={index}
                className={`flex items-center gap-2 px-2 py-1 rounded-xl cursor-pointer group/item transition-all duration-300 ${index === show ? 'bg-primary-50 dark:bg-primary-900/20 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                onClick={() => setShow(index)}
              >
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 ${index === show ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  {index + 1}
                </span>
                <span className={`flex-1 min-w-0 line-clamp-1 font-semibold transition-colors duration-200 ${index === show ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200'}`}>
                  {item.title}
                </span>
                <div className="relative w-8 h-10 flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </li>
            )
          })
        }
      </ul>

      <div className="relative w-full md:w-[calc(100%_-_250px)] h-[320px] md:h-auto overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 order-1 md:order-2">
        {
          displayData.map((item, index) => {
            return <div
              key={index}
              className={`${index === show ? "opacity-100 translate-x-0" : "opacity-0 absolute translate-x-4"} top-0 left-0 w-full h-full group bg-slate-900 transition-all duration-500 cursor-pointer overflow-hidden`}
              onClick={() => router.push(`/truyen/${item.slug}`)}
            >
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-primary-400 text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Biên tập viên đề cử</span>
                <h3 className="text-white text-3xl font-bold mb-3 drop-shadow-lg">{item.title}</h3>
                <p className="text-slate-300 line-clamp-2 max-w-2xl text-sm leading-relaxed mb-4 drop-shadow-md">{item.description}</p>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white text-xs font-bold border border-white/20">
                    {item.category?.cate}
                  </span>
                  <span className="text-white/60 text-xs font-medium">#{item.author?.name}</span>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  </div>;
};

const EditorRecomened: React.FC<Maincomponent> = ({ data }: Maincomponent) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data || data.length === 0) return null;

  return <EditorRecomenedContent data={data} />;
};

export default EditorRecomened;
