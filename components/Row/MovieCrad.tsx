import { Movie } from '@/typings'
import React from 'react'
import Image from 'next/image'

import { useRecoilState } from 'recoil'
import { modalState, movieState } from '@/atoms/modal'
import {  DocumentData } from 'firebase/firestore'

interface Props {
  movie: Movie | DocumentData
}

const MovieCrad = ({ movie }: Props) => {
    const [modal, setModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    return (
      <div className='relative h-28 min-w-[140px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] group'
      onClick={() => {
        setCurrentMovie(movie)
        setModal(true)}
        }>
          <div className='absolute top-1 left-1 z-10'>
            <div className='logo'></div>
          </div>
          <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} className='rounded-sm object-cover md:rounded' fill={true} width={0} height={0} sizes='100vh' priority={false} alt='' />
          <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-sm opacity-0 hover:opacity-100 text-white'>
            <p className='text-xs md:text-sm font-bold flex justify-center items-center h-full text-center whitespace-normal'>{movie?.title}</p>
          </div>
      </div>
    )
}

export default MovieCrad