import React from 'react'
import {MdOutlineArrowForwardIos} from 'react-icons/md'

export const Membership = () => {
  return (
    <div className='bg'>
      <h1 className='text-center text-lg mb-4'>Ready to watch? Enter your email to create or restart your membership.</h1>
      <form className='flex items-center justify-center gap-2 small'>
        <input type="text" placeholder='Email address' className='p-2 bg-transparent outline outline-1 outline-white rounded-lg' required />
        <button className='flex items-center bg-red-700 hover:scale-105 transition-all duration-400 p-2 rounded-lg text-xl'>Get Started <MdOutlineArrowForwardIos size={15} className='text-white ml-1' /></button>
      </form>
    </div>
  )
}