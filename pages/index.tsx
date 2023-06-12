import requests from '@/utils/requests'
import { Movie } from '@/typings'
import { Hero, Row, Footer } from '@/components/Sections'
import { Navbar } from '@/components/Navbar'
import useAuth from '@/hooks/useAuth'

import Head from 'next/head'
import { modalState, movieState } from '@/atoms/modal'
import { useRecoilValue } from 'recoil'
import Modal from '@/components/Modal/Modal'
import { Toaster } from 'react-hot-toast'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
}

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  horrorMovies,
  topRated,
  trendingNow,
}: Props) {
  const { loading, user } = useAuth()
  const modal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  if (loading) return null
  return (
    <main className="relative h-screen bg-gradient-to-b lg:h-[140vh] select-none">
      <Toaster />
      <Head>
      <title>Netflix</title>
      <link rel='icon' href="/favicon.ico" />
      </Head>
        <Navbar />
        <div className='relative pb-24 space-y-8 lg:space-y-36'>
          <Hero netflixOriginals={netflixOriginals}/>
          <section className='px-2 sm:px-8 md:space-y-16'>
            <Row title='NETFLIX ORIGINALS' movies={netflixOriginals} />
            <Row title='Trending Now' movies={trendingNow}/>
            <Row title='Top Rated' movies={topRated} />
            <Row title="Horror" movies={horrorMovies} />
            <Row title="Action" movies={actionMovies}/>
            <Row title="Comedy" movies={comedyMovies}/>
          </section>
          <Footer />
        </div>
        {modal && <Modal />}
    </main>
  )
}

export const getServerSideProps = async () => {
  const [ netflixOriginals, trendingNow, topRated, actionMovies, comedyMovies, horrorMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
    }
  }
}
