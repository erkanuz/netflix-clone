import React from 'react'
import { Movie } from '@/typings'
import { DocumentData } from 'firebase/firestore'
import FavCard from './FavCard'

interface Props {
    movies: Movie[] | DocumentData[]
  }

const Favs = ({ movies }: Props) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-2 mx-1'>     
        {
        movies.map((movie) => (
          <FavCard key={movie.id} movie={movie} />
        ))
        }
    </div>
  )
}

export default Favs