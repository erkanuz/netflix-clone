import React from 'react'
import { Movie } from '@/typings'
import MovieCrad from './MovieCrad'

import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/navigation"
import { Navigation, Parallax, FreeMode, Pagination } from 'swiper'
import { DocumentData } from 'firebase/firestore'

interface Props {
  title: string
  movies: Movie[] | DocumentData[]
}

export const Row = ({ title, movies }: Props) => {
  return (
    <div className='h-40 md:space-y-2'>
      <h2 className='w-56 text-sm font-semibold text-gray-300 transition duration-200 hover:text-white md:text-2xl z-10'>{title}</h2>
      <Swiper
        loop={true} navigation={true}
        grabCursor={false} freeMode={true}
        parallax={true} speed={1000}
        spaceBetween={5}
        breakpoints={{
          1920: {
            slidesPerView: 7,
            slidesPerGroup: 7,
            spaceBetween: 10,
          },
          1279: {
            slidesPerView: 4.6,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 3.5,
            slidesPerGroup: 3,
          },
          912: {
            slidesPerView: 3.2,
            slidesPerGroup: 3,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2.7,
            slidesPerGroup: 2,
          },
          540: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 2,
          },
          281: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 2,
          },
          0: {
            slidesPerView: 1.4,
            slidesPerGroup: 1,
            spaceBetween: 2,
          },
        }}
        modules={[Navigation, Parallax, FreeMode, Pagination]}
        className="mySwiper">
        {
          movies.map((movie, ids) => (
            <SwiperSlide key={ids}><MovieCrad key={movie.id} movie={movie} /></SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}