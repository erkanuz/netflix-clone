import React from 'react'
import TransitionsModal from './Modal/Modal'
import Image from 'next/image'

export const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-black sm:bg-transparent'>
      <Image src={'/logos/netflixs.svg'} alt={''} width={100} height={100} className='hidden sm:block object-contain w-auto h-auto backdrop-brightness-50' />
      <TransitionsModal />
    </div>
  )
}