import React from 'react'
import { Shows } from '@/typings'
import { DocumentData } from 'firebase/firestore'
import TVDetails from './TVDetails'

interface Props {
  title: string
  shows: Shows[] | DocumentData[]
}

const TVRows = ({ title, shows }: Props) => {
  return (
    <div className='h-40 md:space-y-2'>
    <h2 className='w-56 text-sm font-semibold text-gray-300 transition duration-200 hover:text-white md:text-2xl z-10'>{title}</h2>
    <div className=' max-w-[1400px] grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center gap-2'>
      {
        shows.map((show) => (
          <TVDetails key={show.id} show={show} />
        ))
      }
    </div>
  </div>
  )
}

export default TVRows