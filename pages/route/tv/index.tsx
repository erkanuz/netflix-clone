import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import useAuth from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { Shows } from '@/typings';
import TVRows from '@/components/TV/TVRows';
import { Navbar } from '@/components/Navbar';
import requests from '@/utils/requests';

interface Props {
  series: Shows[];
}

const TV = ({ series }: Props) => {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  return (
    <div className="grid">
      <Head>
        <title>TV</title>
      </Head>
      <Toaster />
      <Navbar />
      <div className="grid place-items-center mt-20 mb-10 select-none">
        <TVRows title="TV Shows" shows={series} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const seriesResponse = await fetch(requests.fetchSeries);
  const seriesData = await seriesResponse.json();

  return {
    props: {
      series: seriesData.results,
    },
  };
};

export default TV;