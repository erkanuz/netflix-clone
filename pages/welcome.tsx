import React from 'react'
import Head from 'next/head'
import { Blocks, Footer, Frequently, Header, Membership, Navbar } from '@/components/intruducer'

const HeaderData = {
  title: "Unlimited movies, TV shows, and more.",
  subtitle: "Watch anywhere. Cancel anytime.",
  LeftSide: "Have fun with netflix",
  button: "Get Started",
}

const Welcome = () => {
  return (
    <div>
      <Head>
      <title>Welcome</title>
      <link rel='icon' href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header {...HeaderData} />
      <Blocks />
      <Frequently />
      <Membership />
      <Footer />
    </div>
  )
}

export default Welcome