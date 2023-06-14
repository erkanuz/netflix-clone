import { Movie } from '@/typings'
import React, { useState } from 'react'
import Image from 'next/image'

import { useRecoilState } from 'recoil'
import { modalState, movieState } from '@/atoms/modal'
import {  DocumentData, deleteDoc, doc } from 'firebase/firestore'

import {AiFillDelete} from 'react-icons/ai'
import { db } from '@/firebase'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'

interface Props {
  movie: Movie | DocumentData
}

const FavCard = ({ movie }: Props) => {
    const [modal, setModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    const toastStyle = {
      color: 'black',
      fontSize: '16px',
      borderRadius: '9999px',
      maxWidth: '1000px'
    }

    const [buttondelete, setDelete] = useState(true)
    const { user } = useAuth()
    const Delete = async () => {
      if(buttondelete) {
        await deleteDoc(
          doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
        )
        toast.error(
          `${movie?.title} has been removed from My List`,
          {
            style: toastStyle
          }
        )
      }
    }
  return (
    <div className='relative h-28 min-w-[140px] transition duration-200 ease-out md:h-36 md:min-w-[260px] cursor-pointer group'>
        <div className='absolute top-1 left-1 z-10'>
          <div className='logo'></div>
        </div>
        <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} className='rounded-sm object-cover md:rounded' fill={true} priority={false} width={0} height={0} sizes='100vh' alt='' />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-sm opacity-0 hover:opacity-100 text-white'>
          <p className='text-xs md:text-sm font-bold flex justify-center items-center h-full text-center whitespace-normal'
            onClick={() => {
              setCurrentMovie(movie)
              setModal(true)}
              }>{movie?.title}</p>
          <div className='absolute right-2 bottom-2' onClick={Delete}>{ buttondelete ? <AiFillDelete/> : null}</div>
        </div>
    </div>
  )
}

export default FavCard