import React from 'react'
import { GiWorld } from 'react-icons/gi'

export const Footer = () => {

  const links = [
    ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test'],
    ['Help Center', 'Jobs', 'Cookie Preferences', 'Legal Guarantee'],
    ['Account', 'Ways to Watch', 'Corporate Information', 'Legal Notices'],
    ['Media Center', 'Terms of Use', 'Contact Us', 'Only on Netflix'],
  ];
  
  return (
    <div className='flex flex-col items-center w-full pt-20 fot bg-black'>
      <div className='flex flex-col items-start'>
      <p className='text-white underline decoration-1 pb-6'>Questions? Contact Us.</p>

      <div className="grid sm:grid-cols-4 grid-cols-2 sm:text-sm text-xs leading-6 sm:space-x-10 space-x-0 gap-10 sm:gap-0 mx-auto">
          {links.map((column, index) => (
            <ul key={index}>
              {column.map((link, subIndex) => (
                <li key={subIndex} className="underline decoration-1">
                  {link}
                </li>
              ))}
            </ul>
          ))}
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