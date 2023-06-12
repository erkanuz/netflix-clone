import { modalState, movieState } from '@/atoms/modal'
import { useRecoilValue, useRecoilState } from 'recoil'
import React, { useEffect, useState } from 'react'

import MuiModal from '@mui/material/Modal'
import {AiOutlineClose} from 'react-icons/ai'

import { Element, Genre, Movie } from '@/typings'
import ReactPlayer from 'react-player/lazy'

import {BsCheck2All, BsPatchPlus} from 'react-icons/bs'
import { db } from '@/firebase'
import useAuth from '@/hooks/useAuth'
import { collection, deleteDoc, doc, setDoc, onSnapshot, DocumentData } from 'firebase/firestore'
import toast from 'react-hot-toast'

const Modal = () => {
    const [modal, setModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(true)

    const { user } = useAuth()
    const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])
    const [addToList, setAddedToList] = useState(false)

    const toastStyle = {
      color: 'black',
      fontSize: '16px',
      borderRadius: '9999px',
      maxWidth: '1000px'
    }
    
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
    [movies]
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
        if(!movie) return
          
        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            )
            .then((response) => response.json())
            .catch((err) => console.log(err.message))

            if(data?.videos) {
                const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
                setTrailer(data.videos?.results[index]?.key)
            }
            if(data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()
    },[movie])

    const handleClose = () => {
        setModal(false)
    }

  return (
    <MuiModal open={modal} onClose={handleClose} className='fixed !top-10 left-0 right-0 z-50 mx-auto w-full max-w-5xl
     overflow-y-scroll rounded-md'>
        <>
        <button className='absolute right-5 top-5 !z-40 text-white h-8 w-8 flex items-center justify-center bg-black rounded-full border' onClick={handleClose}>
            <AiOutlineClose size={20} />
        </button>
        <div className='relative pt-[56.25%]'>
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%" height="100%"
            style={{position: 'absolute', top: '0', left: '0'}}
            playing
            muted={muted}
            />
        </div>

        <div className='grid rounded-b-md bg-[#181818] px-10 py-8'>
            <div className='space-y-4'>
                <div className='flex items-center text-xs gap-4'>
                    <p className='text-red-400'>{Math.round(movie?.vote_average * 10)}% Match</p>
                    <p>{movie?.release_date || movie?.first_air_date}</p>
                    <div className='flex items-center justify-center rounded border border-white text-[10px] px-1'>HD</div>
                    <button onClick={handleList}>
                    { addToList ?  <BsCheck2All size={20} />  : <BsPatchPlus size={20} className='animate-pulse' /> }
                    </button>
                </div>
                <div className='flex flex-col md:flex-row items-start justify-between text-xs'>
                    <div className='grid gap-2'>
                        <p className='text-sm'>{movie?.title}</p>
                        <p className='max-w-[500px] text-justify'>{movie?.overview}</p>
                    </div>
                    <div className='mt-[28.5px]'>
                        <div>
                            <span className='text-red-400'>Genres: </span>
                            {genres.map((genre) => genre.name).join(' | ')}
                        </div>
                        <div>
                            <span className='text-red-400'>Original language: </span>
                            {movie?.original_language.toUpperCase()}
                        </div>
                        <div>
                            <span className='text-red-400'>Total votes: </span>
                            {movie?.vote_count}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    </MuiModal>
  )
}

export default Modal