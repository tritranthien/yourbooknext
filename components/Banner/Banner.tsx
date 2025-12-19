import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type BannerProps = {
    imgs: string,
    link: string
}

const Banner:React.FC<BannerProps> = ({imgs,link}: BannerProps) => {
  return <div className="container px-5"> 
  <Link legacyBehavior passHref href={link}>
      <a>
        <div className="w-full h-14 relative flex justify-center items-center"> 
          <Image alt='image' layout='fill' src={imgs} className='absolute object-cover opacity-50 z-10'/>
          <span className='text-3xl font-bold z-20 text-white outline-1'>Tải app YourBook</span>
        </div>
      </a>
  </Link>
  </div>
};

export default Banner;
