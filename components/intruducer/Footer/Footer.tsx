import React from 'react'
import { GiWorld } from 'react-icons/gi'

export const Footer = () => {
  return (
    <div className='flex flex-col items-center w-full pt-20 fot bg-black'>
      <div className='flex flex-col items-start'>
      <p className='text-white underline decoration-1 pb-6'>Questions? Contact Us.</p>

      <div className='grid sm:grid-cols-4 grid-cols-2 sm:text-sm text-xs leading-6 sm:space-x-10 space-x-0 gap-10 sm:gap-0 mx-auto'>
        <ul>
          <li className='underline decoration-1'>FAQ</li>
          <li className='underline decoration-1'>Invertor Relations</li>
          <li className='underline decoration-1'>Privacy</li>
          <li className='underline decoration-1'>Speed Test</li>
        </ul>
        <ul>
          <li className='underline decoration-1'>Help Center</li>
          <li className='underline decoration-1'>Jobs</li>
          <li className='underline decoration-1'>Cookie Preferences</li>
          <li className='underline decoration-1'>Legal Guarantee</li>
        </ul>
        <ul>
          <li className='underline decoration-1'>Account</li>
          <li className='underline decoration-1'>Ways to Watch</li>
          <li className='underline decoration-1'>Corporate Information</li>
          <li className='underline decoration-1'>Legal Notices</li>
        </ul>
        <ul>
          <li className='underline decoration-1'>Media Cneter</li>
          <li className='underline decoration-1'>Terms of Use</li>
          <li className='underline decoration-1'>Contact Us</li>
          <li className='underline decoration-1'>Only on Netflix</li>
        </ul>
      </div>

      <div className='flex items-center bg-gray-700 outline outline-white rounded-md px-2 w-28 my-10'>
        <GiWorld size={20} />
        <select name="format" className='text-white bg-gray-700 outline-none cursor-pointer'>
          <option value="English">English</option>
          <option value="Japanese"> Japanese</option>
        </select>
      </div>

      <div className='mb-5'>
        <p>Netflix Clone</p>
      </div>

      </div>
    </div>
  )
}