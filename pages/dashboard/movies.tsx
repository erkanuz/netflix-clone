import React from 'react'
import Link from 'next/link'

const movies = () => {
  return (
    <div className='max-w-[1440px] min-h-screen mx-auto p-4 dark:text-white'>
    <div className='flex flex-col items-center justify-center gap-4 text-xl mt-8'>
        <img src={'/images/404.svg'} className='h-auto max-w-full' alt="" />
        <p>Page Not Found</p>
        <p>The page are you looking for doesn't exist or currently not available</p>
        <Link href={'/'}>
            <button className='block relative overflow-hidden text-center rounded-none outline outline-white'>
                <span className='text-md text-white italic relative z-10 px-1'>BACK TO HOME</span>
                <div className='w-[300px] h-[300px] bg-[#4973ff] shadow-[inset_0_0_50px_rgba(0_0_0_.5)] absolute -top-20 left-0 transition-all liquid'></div>
            </button>
        </Link>
    </div>
</div>
  )
}

export default movies