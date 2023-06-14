import React from 'react'
import Image from 'next/image'
import { Divider } from '@mui/material'

export const Blocks = () => {
  return (
    <div className='flex items-center justify-around bg-black'>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center'>
          <div className='grid sm:text-start text-center gap-4'>
            <h1 className='text-4xl font-bold'>Enjoy on your TV</h1>
            <p>Watch on Smart TVs, Playstation, Xbox, Chromecast,<br /> Apple TV, Blu-ray players, and more.</p>
          </div>
          <div className='grid place-content-center'>
            <Image src={'/images/1.png'} alt='' width={1000} height={1000} className='w-full h-full object-cover' />
          </div>
        </div>
        <Divider className='bg-gray-800 w-screen h-2' />
        <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center my-10'>
          <div className='grid col-start-2 sm:col-start-1 place-content-center'>
            <Image src={'/images/2.png'} alt='' width={1000} height={1000} className='w-full h-full object-cover' />
          </div>
          <div className='grid col-start-2 sm:col-start-2 row-start-1 sm:row-start-1 sm:text-start text-center gap-4'>
            <h1 className='text-4xl font-bold'>Download your shows<br /> to watch offline</h1>
            <p className='px-16 sm:px-0'>Save your favorites easily and always have something to watch.</p>
          </div>
        </div>
        <Divider className='bg-gray-800 w-screen h-2' />
        <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center my-10'>
          <div className='grid sm:text-start text-center gap-4'>
            <h1 className='text-4xl font-bold'>Watch eveywhere</h1>
            <p>Stream unlimited movies and TV shows on your phone,<br /> table, laptopm and TV.</p>
          </div>
          <div className='grid place-content-center'>
            <Image src={'/images/3.png'} alt='' width={1000} height={1000} className='w-full h-full object-cover' />
          </div>
        </div>
        <Divider className='bg-gray-800 w-screen h-2' />
        <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center my-10'>
          <div className='grid col-start-2 sm:col-start-1 place-content-center'>
            <Image src={'/images/4.png'} alt='' width={1000} height={1000} className='w-full h-full object-cover' />
          </div>
          <div className='grid col-start-2 sm:col-start-2 row-start-1 sm:row-start-1 sm:text-start text-center gap-4'>
            <h1 className='text-4xl font-bold'>Create profiles for kids</h1>
            <p>Send kids on adventures with their favorite characters<br /> in a space made just for them - free with your<br /> membership.</p>
          </div>
        </div>
        <Divider className='bg-gray-800 w-screen h-2' />
      </div>
    </div>
  )
}