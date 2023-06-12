import React from 'react'
import {MdKeyboardArrowDown} from 'react-icons/md'
import { Data } from '../Data/Data'

export const Frequently = () => {
  return (
    <div className='text-white mx-auto py-20 bg'>
      <h1 className='text-5xl font-bold tracking-wide text-center mb-6 w-full '>Frequently Asked Questions</h1>

      <div className='grid place-items-center gap-6'>
        {
          Data && Data.map((x, id) => (
            <div className='relative max-w-[600px] overflow-hidden mx-2' key={id}>
              <input type="checkbox" className='absolute bg-white top-0 inset-x-0 w-full h-12 z-10 opacity-0 cursor-pointer peer' />

              <div className='bg-[#1e293b] peer-hover:bg-[#334155] h-12 w-full pl-5 flex items-center'>
                <h1 className='text-lg- font-semibold'>{x.title}</h1>
              </div>

              <div className='absolute top-3 right-3 text-white transition-transform duration-500 rotate-0 peer-checked:rotate-180'><MdKeyboardArrowDown size={20} /></div>

              <div className='bg-white max-h-0 peer-checked:max-h-80 overflow-hidden transition-all duration-500'>
                <div className='p-4 text-black'>
                  <p>{x.description}</p>
                </div>
              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}