import React from 'react';
import { BsMoonStarsFill } from 'react-icons/bs'
import { SiIcomoon } from 'react-icons/si'
import { FaSun } from 'react-icons/fa'
import { GiAlienFire, GiEvilMoon, GiFrostfire, GiMoonClaws, GiMoonOrbit, GiStonePile, GiSwordTie } from 'react-icons/gi'


const Menubox:React.FC = () => {
  return <ul className="flex list-none flex-wrap text-2xl py-4">
          <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <BsMoonStarsFill/>
                <span>Tiên hiệp</span>
            </li>
            <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <GiMoonOrbit/>
                <span>Võ hiệp</span>
            </li>
              
              <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <GiMoonClaws/>
                <span>Huyền huyễn</span>
            </li>
            <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <SiIcomoon/>
                <span>Đô Thị</span>
            </li>
            <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <GiEvilMoon/>
                <span>Đam mỹ</span>
            </li>
            <li className= "w-full p-2  text-center basis-1/5 flex flex-col items-center">
                <FaSun/>
                <span>Quan Trường</span>
            </li>
            <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <GiSwordTie/>
                <span>Linh dị</span>

            </li>
            <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <GiAlienFire/>
                <span>Kinh dị</span>
            </li>
            <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <GiFrostfire/>
                <span>Võng du</span>
            </li>
            <li className=" w-full p-2 text-center basis-1/5 flex flex-col items-center">
                <GiStonePile/>
                <span>Hậu cung</span>
            </li>
      </ul>
};

export default Menubox;
