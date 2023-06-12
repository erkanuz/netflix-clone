import requests from '@/utils/requests'
import { Shows } from '@/typings'
import { Navbar } from '@/components/Navbar'
import useAuth from '@/hooks/useAuth'

import { Toaster } from 'react-hot-toast'
import TVRows from '@/components/TV/TVRows'
import Head from 'next/head'

interface Props {
  series: Shows[]
}

export default function TV({
  series,
}: Props) {
  const { loading, user } = useAuth()
  if (loading) return null
  return (
    <div className='grid'>
      <Head>
        <title>TV</title>
      </Head>
    <Toaster />
    <Navbar />
      <div className="grid place-items-center mt-20 mb-10 select-none">
        <TVRows title="TV Shows" shows={series}/>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const [ series,
  ] = await Promise.all([
    fetch(requests.fetchSeries).then((res) => res.json()),
  ])

  return {
    props: {
      series: series.results,
    }
  }
}
