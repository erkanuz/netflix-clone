import React from 'react'
import Image from 'next/image'

import {AiOutlineRight} from 'react-icons/ai'
import {GiPopcorn} from 'react-icons/gi'
import {FiMonitor} from 'react-icons/fi'
import {RiMovie2Fill} from 'react-icons/ri'

interface Props {
 title: string
 subtitle: string
 LeftSide: string
 button: string
}

export const Header = ({title, subtitle, LeftSide, button}: Props) => {
  return (
    <div className='sm:flex grid items-center sm:justify-between justify-center h-screen bg-black sm:bg-transparent bg-gradient-to-t from-black p-4'>

      <div className='2xl:grid hidden h-[22%] w-0.5 bg-black dark:bg-white absolute top-[34%] left-[52px] z-10'></div>
      <div className='2xl:grid hidden h-[22%] w-0.5 bg-black dark:bg-white absolute top-[12%] left-[92px] z-10'></div>

      <Image src={'https://images.unsplash.com/photo-1643208589889-0735ad7218f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'}
       alt='' fill={true} priority={true} className='-z-10 object-cover hidden sm:block contrast-125 brightness-125 saturate-200' />

      <h1 className='title sm:flex hidden sm:relative absolute bottom-[25%] left-10'>{LeftSide}</h1>

      <div className='flex flex-col items-center text-center gap-4 text-red-500 font-semibold mt-20'>
        <h1 className='sm:text-3xl text-base'>{title}</h1>
        <h2 className='sm:text-2xl text-sm'>{subtitle}</h2>
        <button className='flex items-center justify-center bg-red-600 text-white py-1 w-32 hover:scale-110 duration-300 '>{button}<AiOutlineRight /></button>
      </div>

      <div className='relative top-[20%] right-[1.5%] sm:grid hidden gap-16 justify-center between '>
        <FiMonitor size={30} className='head_icon'/>
        <span className='hax'></span>
        <GiPopcorn size={30} className='head_icon'/>
        <span className='hax'></span>
        <RiMovie2Fill size={30} className='head_icon'/>
      </div>

    </div>
  )
}