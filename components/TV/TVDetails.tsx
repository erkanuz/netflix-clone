import { Genre, Shows } from '@/typings'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {  DocumentData } from 'firebase/firestore'

interface Props {
  show: Shows | DocumentData
}

const TVDetails = ({ show }: Props) => {

  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {      
    if(!show) return
      
    async function fetchMovie() {
        const data = await fetch(
            `https://api.themoviedb.org/3/${show?.media_type === 'movie' ? 'movie' : 'tv'
            }/${show?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&append_to_response=videos`
        )
        .then((response) => response.json())
        .catch((err) => console.log(err.message))

        if(data?.genres) {
            setGenres(data.genres)
        }
    }

    fetchMovie()
  },[show])

    return (
      <div className='relative h-28 min-w-[140px] transition duration-200 ease-out md:h-36 md:min-w-[260px] group'>
          <div className='absolute top-1 left-1 z-10'>
            <div className='logo'></div>
          </div>
          <Image src={`https://image.tmdb.org/t/p/w500${show.backdrop_path || show.poster_path}`} className='rounded-sm object-cover md:rounded' fill={true} width={0} height={0} sizes='100vh' priority={true} alt='' />
          <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-sm opacity-0 hover:opacity-100 text-white'>
            <p className='text-xs md:text-sm font-bold flex justify-center items-center h-full text-center whitespace-normal'>{show?.name}</p>
            <p className='absolute bottom-1 right-2 text-yellow-300 text-xs'>{show?.vote_average}</p>
            <p className='absolute bottom-1 left-2 text-xs'>{genres.map((genre) => genre.name).slice(0, 2).join(' ')}</p>
          </div>
      </div>
    )
}

export default TVDetails