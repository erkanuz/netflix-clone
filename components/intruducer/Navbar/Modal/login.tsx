import Head from 'next/head'
import { Inter } from 'next/font/google'
import {FcGoogle} from 'react-icons/fc'
import {BsApple} from 'react-icons/bs'

import React, {useState} from 'react'
import useAuth from '@/hooks/useAuth'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
   email: string
   password: string
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  } 

  return (
    <div className='flex items-center justify-center m-auto p-4 min-h-screen select-none'>
    <Head>
      <title>Auth</title>
      <link rel='icon' href="/favicon.ico" />
    </Head>
    <div className='flex gap-32'>
    <div className='hidden lg:block'>
        <div className='opener_logo'></div>
    </div>

    <div className='flex items-center justify-center'>
      <div className='w-full'>
        <div className='my-4 text-center'>
          <h1 className='text-4xl font-bold'>Get started now</h1>
          <p className='text-sm mt-6'>Welcome Back ! Please enter your details.</p>
        </div>

        <div className='grid sm:flex items-center justify-center gap-4 sm:gap-6'>
          <button className="flex justify-center items-center bg-white text-black py-2 w-[200px] rounded-lg mt-5 hover:scale-110 duration-300"><FcGoogle className='text-2xl mr-3' />Login ~ Google</button>
          <button className="flex justify-center items-center bg-white text-black py-2 w-[200px] rounded-lg mt-5 hover:scale-110 duration-300"><BsApple className='text-2xl mr-3' />Login ~ Apple</button>
        </div>

        <div className="my-10 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-400" />
          <p className="text-center">OR</p>
          <hr className="border-gray-400" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-6'>
          <div className='relative justify-start sm:w-[400px] w-[300px]'>
            <input type="email" placeholder='email' className='text-white inputs'
            {...register('email', { required: true})} />
            <span className='anim_underline'></span>
          </div>
          <div className='relative justify-start sm:w-[400px] w-[300px]'>
            <input type="password" placeholder='password' className='text-white inputs' required 
            {...register('password', { required: true})} />
            <span className='anim_underline'></span>
          </div>
          <div className='flex justify-center mb-4'>
            <button type='submit' className='btn' 
            onClick={() => setLogin(true)}>Sing up</button>
          </div>
          <div className='flex items-center justify-center text-sm gap-2'>
            <p className='text-gray-400'>New to Netflix ?</p>
            <button className='font-semibold hover:underline underline-offset-2 cursor-pointer hover:scale-110 transition-all'
            onClick={() => setLogin(false)} type='submit'>Sing up now</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
  )
}
