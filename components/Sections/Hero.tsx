import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Movie } from '@/typings'
import { baseUrl } from '@/constants/movie'

import {FaPlay} from 'react-icons/fa'
import {IoAddOutline} from 'react-icons/io5'
import {BsInfoCircle, BsStarFill} from 'react-icons/bs'

import { useRecoilState } from 'recoil'
import { modalState, movieState } from '@/atoms/modal'

import { Element, Genre } from '@/typings'

import { db } from '@/firebase'
import useAuth from '@/hooks/useAuth'
import { collection, deleteDoc, doc, setDoc, onSnapshot, DocumentData } from 'firebase/firestore'
import { toast, Toaster } from 'react-hot-toast'

interface Props {
    netflixOriginals: Movie[]
  }

export const Hero = ({ netflixOriginals }: Props) => {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [modal, setModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    const { user } = useAuth()
    const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])
    const [addToList, setAddedToList] = useState(false)

    const [genres, setGenres] = useState<Genre[]>([])

    const toastStyle = {
      color: 'black',
      fontSize: '16px',
      borderRadius: '9999px',
      maxWidth: '1000px'
    }

    useEffect(() => {      
      if(!movie) return
        
      async function fetchMovie() {
          const data = await fetch(
              `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
              }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
              }&language=en-US&append_to_response=videos`
          )
          .then((response) => response.json())
          .catch((err) => console.log(err.message))

          if(data?.genres) {
              setGenres(data.genres)
          }
      }

      fetchMovie()
  },[movie])

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])

  useEffect(
    () => 
    setAddedToList(
    movies.findIndex((result) => result.data().id === movie?.id) !== -1
  ),
  [movie]
  )

  const handleList = async () => {
    if (addToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
      )
      toast.error(
        `${movie?.title} has been removed from My List`,
        {
          style: toastStyle
        }
      )
    }else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
        {...movie}
      )
      toast.success(
        `${movie?.title} has been added to My List`,
        {
          style: toastStyle
        }
      )
    }
  }
    
    useEffect(() => {
        setMovie(
          netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
        )
      }, [netflixOriginals])

    function truncate(string: any, n: number) {
       return string?.length > n ? string.substr(0, n - 1) + " ... " : string;
      }
    
  return (
    <div className='flex flex-col justify-end space-y-2 md:space-y-4 pt-72 sm:pt-0 md:pt-20 lg:pb-12 pl-4 lg:pl-8 lg:h-[65vh]'>
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
        <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} alt='' fill={true} className='object-cover' priority={false} />
      </div>

      <div className='flex items-center gap-2 sm:pl-1.5 pl-0.5'>
          <div className='net'></div>
          <span className='font-bold text-2xl'>{movie?.title ? 'F I L M' : 'TV'}</span>
      </div>
      
      <h1 className='text-3xl sm:text-xl md:text-7xl font-bold'>{movie?.title || movie?.name || movie?.original_name}</h1>

      <div className='hidden sm:flex items-center justify-between max-w-[500px] text-sm px-2 '>
        <span className='font-bold'>{movie?.release_date?.slice(0, 4)}</span>
        <div className='flex items-center gap-1'><BsStarFill className='text-yellow-400'/><span className='font-bold'>{movie?.vote_average.toFixed(1)}</span></div>
        <div className='h-5 w-5 bg-red-500 flex items-center justify-center'><span className='text-white font-bold'>{movie?.original_language.toUpperCase()}</span></div>
        <div className='grid h-5 w-0.5 bg-white z-10'></div>
        <span className='font-bold'>{genres.map((genre) => genre.name).slice(0, 5).join(' ')}</span>
      </div>

      <div className='sm:hidden flex gap-2'>
        <span className='text-green-400 font-bold'>{movie?.release_date || movie?.first_air_date}</span>
        <div className='flex items-center gap-1'><BsStarFill className='text-yellow-400'/><span className='font-bold'>{movie?.vote_average.toFixed(1)}</span></div>
        <span className='font-bold'>{genres.map((genre) => genre.name).slice(0, 3).join(' ')}</span>
      </div>

      <p className='max-w-xs md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-xs md:text-lg text-gray-300 font-semibold '>{truncate(movie?.overview, 300)}</p>

      <div className='my-4 flex sm:hidden flex-wrap gap-4 font-bold'>
        <button className='btn2'onClick={() => {
          setCurrentMovie(movie)
          setModal(true)}
          }><FaPlay /> Play Now</button>
        <button className='btn'><BsInfoCircle />More information</button>
      </div>

      <div className='my-4 sm:flex hidden flex-wrap gap-4 font-bold'>
        <button className='BTN but' onClick={() => {
          setCurrentMovie(movie)
          setModal(true)}
          }><FaPlay className='sign' 
         /><div className='text'>Play Now</div></button>
        <button className='BTN but2'><BsInfoCircle className='sign' /><div className='text'>Information</div></button>
        <button className='BTN but3'><IoAddOutline className='sign' /><div className='text' onClick={handleList}>Add To List</div></button>
      </div>
    </div>
  )
}