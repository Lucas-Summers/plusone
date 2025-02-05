import React from 'react'
import Main from "./components/Main";
import Hero from "./components/Hero";
import { Nunito, Open_Sans } from 'next/font/google';
const nunito = Nunito({ subsets: ["latin"] });

export default function HomePage() {
  const header = (
    <header className='p-4 sm:p-8 flex items-center justify-end gap-4'>
      <div className='flex items-center justify-between'>
	      PLACEHOLDER
      </div>
    </header>
  )

  const footer = (
    <footer className='flex flex-col p-4 sm:p-8 grid place-items-center'>
      <p className='text-indigo-400'>© 2024 NAES, inc</p>
    </footer>
  )

  return (
    <Main>
      {header}
      <Hero />
      <div className='flex-1'></div>
      {footer}
    </Main>
  );
}
