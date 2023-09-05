import Favs from '@/components/Favourites/Favs';
import useAuth from '@/hooks/useAuth';
import useList from '@/hooks/useList';
import { useRecoilValue } from 'recoil';
import Modal from '@/components/Modal/Modal';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { modalState } from '@/atoms/modal';

const Favourites = () => {
  const { user } = useAuth();
  const modal = useRecoilValue(modalState);
  const list = useList(user?.uid);
  const router = useRouter();

  const renderContent = () => {
    if (list.length > 0) {
      return <Favs movies={list} />;
    } else {
      return (
        <div className='flex flex-col items-center justify-center my-8'>
          <img src='/images/thirth.svg' alt='Empty List' />
          <div className='grid place-items-center text-center gap-4'>
            To create your personal list, you must first like a Movie or TV show by pressing the add icon on the Modal page
            <span onClick={() => router.push('/')} className='text-red-600 bg-white rounded-lg px-5 py-1 sm:text-md text-sm cursor-pointer'>Back to home</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='max-w-[1440px] min-h-screen mx-auto pt-20 dark:text-white'>
      <Toaster />
      <Head>
        <title>My List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h3 className='text-4xl text-center mb-1'>My List</h3>
      <h5 className='text-center italic mb-4'>This is your personal favorite movies & TV shows</h5>
      {renderContent()}
      {modal && <Modal />}
    </div>
  );
};

export default Favourites;