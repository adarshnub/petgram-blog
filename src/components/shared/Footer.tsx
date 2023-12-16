import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HiMiniHome } from "react-icons/hi2";
import { MdExplore,MdCreateNewFolder } from "react-icons/md";

import { BsPeopleFill,BsSaveFill } from "react-icons/bs";


const Footer = () => {
  const {pathname} = useLocation()
  return (
    <div className='sticky bottom-0 md:hidden '>
      <ul className="flex  gap-8 h-full">
          <li className={`flex flex-col gap-2 text-xs sm:text-sm w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-[10px] rounded-br-none rounded-bl-none py-2 text-center ${pathname === '/' && 'bg-violet-300 text-gray-800'} `}>
            <HiMiniHome />
            <NavLink className='' to="/">Home</NavLink>
          </li>
          <li className={`flex flex-col gap-2 text-xs sm:text-sm w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-[10px] rounded-br-none rounded-bl py-2 text-center ${pathname === '/create-post' && 'bg-violet-300 text-gray-800'} `}>
          
          <MdCreateNewFolder />
            <NavLink className='' to="/create-post">Create</NavLink>
          </li>
          <li className={`flex flex-col gap-2 text-xs sm:text-sm w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-[10px] rounded-br-none rounded-bl py-2 text-center ${pathname === '/explore' && 'bg-violet-300 text-gray-800'} `}>
          <MdExplore />
            <NavLink className='' to="/explore">Explore</NavLink>
          </li>
          <li className={`flex flex-col gap-2 text-xs sm:text-sm w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-[10px] rounded-br-none rounded-bl py-2 text-center ${pathname === '/all-users' && 'bg-violet-300 text-gray-800'} `}>
          <BsPeopleFill />
            <NavLink className='' to="/all-users">People</NavLink>
          </li>
          <li className={`flex flex-col gap-2 text-xs sm:text-sm w-full items-center hover:bg-violet-300 hover:text-gray-700 font-semibold rounded-[10px] rounded-br-none rounded-bl py-2 text-center ${pathname === '/saved' && 'bg-violet-300 text-gray-800'} `}>
          <BsSaveFill />
            <NavLink className='' to="/saved">Saved</NavLink>
          </li>
        </ul>
    </div>
  )
}

export default Footer